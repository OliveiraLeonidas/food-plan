import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const clerkuser = await currentUser();
    if (!clerkuser) {
      return NextResponse.json(
        { error: "User Not found in clerk" },
        { status: 404 }
      );
    }

    const email = clerkuser?.emailAddresses[0].emailAddress || "";
    if (!email) {
      return NextResponse.json(
        { error: "User does not have an email address" },
        { status: 404 }
      );
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: clerkuser.id },
    });

    if (!existingProfile) {
      return NextResponse.json({ message: "Profile already exists" });
    }

    await prisma.profile.create({
      data: {
        userId: clerkuser.id,
        email,
        subscriptionActive: false,
        subscriptionTier: null,
        stripeSubscriptionId: null,
      },
    });

    return NextResponse.json(
      { message: "Profile created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Internal server error", },
      { status: 500, }
    );
  }
}
