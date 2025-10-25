"use client";
import { availablePlans, mapIntervalToUSA } from "@/lib/plans";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

type subscribeResponse = {
  url: string;
};

type subscribeError = {
  error: string;
};

const subscribeToPlan = async (
  planType: string,
  userID: string,
  email: string
): Promise<subscribeResponse> => {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planType,
      userId: userID,
      email,
    }),
  });

  if (!response.ok) {
    const data: subscribeError = await response.json();
    throw new Error(data.error || "Something went wrong.");
  }

  const data: subscribeResponse = await response.json();

  return data;
};

export default function Subscribe() {
  const { user } = useUser();
  const router = useRouter();

  const userId = user?.id;
  const email = user?.emailAddresses[0].emailAddress || "";

  const { mutate, isPending, variables } = useMutation<
    subscribeResponse,
    Error,
    { planType: string }
  >({
    mutationFn: async ({ planType }) => {
      if (!userId) {
        throw new Error("User not signed id");
      }
      console.info("mutation return", planType, userId, email);
      return subscribeToPlan(planType, userId, email);
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubscribe = async (planType: string) => {
    if (!userId) {
      router.push("/sign-up");
      return;
    }
    mutate({ planType });
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      {/* TODO: change to Header section component */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Planos e Preços
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Comece com nosso plano semanal ou atualize para os planos mensal ou
          anual quando precisar. Sem compromisso, cancele quando quiser.
        </p>
      </div>

      {/* Main plans */}
      <div className="grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {availablePlans.map((plan) => {
          const planTypeUSA = mapIntervalToUSA(plan.interval);
          const isCurrentPlanPending =
            isPending && variables?.planType === planTypeUSA;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border ${
                plan.isPopular
                  ? "border-emerald-500 shadow-2xl"
                  : "border-slate-200 shadow-lg"
              } p-8 transition-transform duration-300 hover:scale-105`}
            >
              {/* Popular card tag */}
              {plan.isPopular && (
                <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
                  Mais Popular
                </p>
              )}

              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-slate-800">
                  {plan.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-slate-900">
                    R$
                    {plan.amount.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-slate-500">/{plan.interval}</span>
                </p>
                <p className="mt-6 text-slate-600">{plan.description}</p>

                <ul role="list" className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckIcon
                        className="h-6 w-6 flex-shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TODO: Add Button component */}
              <button
                disabled={isPending}
                onClick={() => handleSubscribe(planTypeUSA!)}
                className={`cursor-pointer capitalize mt-10 block w-full rounded-lg px-6 py-3 text-center text-base font-thin transition-colors ${
                  plan.isPopular
                    ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                    : "bg-emerald-200 text-emerald-700 hover:bg-slate-200"
                } ${isPending ? "cursor-not-allowed opacity-75" : ""}`}
              >
                {isCurrentPlanPending ? (
                  <div className="flex gap-2">
                    <RotateCcw className="animate-spin" />
                    Aguarde...
                  </div>
                ) : (
                  `Começar com plano ${plan.interval}`
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
