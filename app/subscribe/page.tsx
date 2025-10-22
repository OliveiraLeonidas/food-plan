import { availablePlans } from "@/lib/plans";
import { CheckIcon } from "lucide-react";

export default function Subscribe() {
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
        {availablePlans.map((plan) => (
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
                  {plan.amount}
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
            <a
              href="#" // TODO: checkout link
              className={` capitalize mt-10 block w-full rounded-lg px-6 py-3 text-center text-base font-thin transition-colors ${
                plan.isPopular
                  ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                  : "bg-emerald-200 text-emerald-700 hover:bg-slate-200"
              }`}
            >
              Começar com plano {plan.interval}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
