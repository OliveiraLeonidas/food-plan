import Link from "next/link";
import { UserPlus, Settings, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white text-slate-800">
      {/* TODO: convert to atomic components */}
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-emerald-100/50">
        <div className="container  mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">
            Planos Personalizados com{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              AI FoodPlans
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Deixe nossa IA organizar seu cardápio semanal. Você poderá focar em
            cozinhar e aproveitar as deliciosas receitas sem estresse.
          </p>
          <div className="mt-10">
            <Link
              href="/subscribe"
              className="inline-block rounded-md bg-emerald-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-emerald-700"
            >
              Comece Agora
            </Link>
          </div>
        </div>
      </section>

      {/* TODO: cards */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">Como funciona?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Siga estes passos simples e receba seu cardápio personalizado pela
              AI FoodPlans.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* create an account */}
            <div className="transform rounded-xl border border-slate-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <UserPlus className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">1. Crie sua conta</h3>
              <p className="text-slate-500">
                Faça um cadastro rápido e seguro para começar a sua jornada rumo
                a uma alimentação planejada.
              </p>
            </div>

            {/* preferences */}
            <div className="transform rounded-xl border border-slate-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <Settings className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">
                2. Defina Preferências
              </h3>
              <p className="text-slate-500">
                Informe suas restrições alimentares, metas e quais tipos de
                comida você mais gosta.
              </p>
            </div>

            {/* get foodplanner */}
            <div className="transform rounded-xl border border-slate-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <FileText className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">
                3. Receba seu Cardápio
              </h3>
              <p className="text-slate-500">
                Nossa IA criará um plano semanal exclusivo para você, com
                receitas fáceis de seguir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
