import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  
  let event: Stripe.Event;
  
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`❌ Erro no Webhook: ${error.message}`);

    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Sessão de checkout completa!", session);
      await handleCheckoutSessionCompleted(session);
      break;
    }
    case "invoice.payment_failed": {
      const session = event.data.object as Stripe.Invoice;
      console.log("✅ Pagamento bem-sucedido!", session);
      await handleInVoicePaymentFailed(session);
      break;
    }
    case "customer.subscription.deleted": {
      const session = event.data.object as Stripe.Subscription;
      await handleCustomerSubscriptionDeleted(session);
    }
    default:
      console.warn(`🤷 Evento não tratado: ${event.type}`);
  }
  return NextResponse.json({ received: true }, { status: 200 });
}

const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.clerkUserId;
  if (!userId){ 
    console.log('no userid')
    return
  }

  const subscriptionId = session.subscription as string;

  if (!subscriptionId) {
    console.log('no userid')
    return
  }
  
  try {
    await prisma?.profile.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionTier: session.metadata?.planType || null,
        subscriptionActive: true
      }
    })
  } catch (error) {
    console.error(error)
  }

};

const handleInVoicePaymentFailed = async (invoice: Stripe.Invoice) => {
  const subId = invoice.parent?.subscription_details?.subscription as string

  if(!subId) {
    throw new Error('')
  }
  let userId: string | undefined;

  try {
    const profile = await prisma?.profile.findUnique({ where: { stripeSubscriptionId: subId }, select: { userId: true } })

    if (!profile?.userId) {
      console.log('No found user')
      return
    }
    userId = profile.userId;


  } catch (error) {
      console.error(error)
      return
  }

  try {
    await prisma?.profile.update({
      where: { userId: userId },
      data: {
        subscriptionActive: false
      }
    })
  } catch (error) {
    console.error(error)
    return
  }
};

const handleCustomerSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  const subId = subscription.id as string;

  if(!subId) {
    throw new Error('')
  }
  let userId: string | undefined;

  try {
    const profile = await prisma?.profile.findUnique({ where: { stripeSubscriptionId: subId }, select: { userId: true } })

    if (!profile?.userId) {
      console.log('No found user')
      return
    }
    userId = profile.userId;


  } catch (error) {
      console.error(error)
      return
  }

  try {
    await prisma?.profile.update({
      where: { userId: userId },
      data: {
        subscriptionActive: false,
        stripeSubscriptionId: null,
        subscriptionTier: null
      }
    })
  } catch (error) {
    console.error(error)
    return
  }
};
