export interface Plan {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}
export const availablePlans: Plan[] = [
  {
    name: "Plano Semanal",
    amount: 9.99,
    currency: "BRL",
    interval: "semanal",
    description:
      "Sua porta de entrada para uma alimentação inteligente. Experimente uma semana de pratos deliciosos e planejados sob medida para você.",
    features: [
      "Cardápios semanais gerados por IA",
      "Lista de compras automática",
      "Cancele a qualquer momento",
    ],
  },
  {
    name: "Plano Mensal",
    amount: 29.9,
    currency: "BRL",
    interval: "mensal",
    isPopular: true,
    description:
      "Construa o hábito de comer bem. O plano ideal para integrar uma alimentação saudável e prática ao seu dia a dia, de forma contínua.",
    features: [
      "Tudo do plano Semanal, e mais:",
      "Insights nutricionais detalhados",
      "Suporte prioritário via chat",
      "Cancele a qualquer momento",
    ],
  },
  {
    name: "Plano Anual",
    amount: 289.99,
    currency: "BRL",
    interval: "anual",
    description:
      "A transformação completa com o máximo de economia. Comprometa-se com seu bem-estar o ano todo e deixe o planejamento conosco.",
    features: [
      "Tudo do plano Mensal, e mais:",
      "Acesso a todas as funcionalidades premium",
      "Receitas exclusivas para assinantes",
      "Planejamento com até 3 meses de antecedência",
    ],
  },
];

export const mapIntervalToUSA = (planTypeBr: string) => {
  switch (planTypeBr) {
    case "semanal":
      return "week";
    case "mensal":
      return "month";
    case "anual":
      return "year";
    default:
      break;
  }
};

const priceIDMap: Record<string, string> = {
  week: process.env.STRIPE_PRICE_WEEKLY!,
  month: process.env.STRIPE_PRICE_MONTHLY!,
  year: process.env.STRIPE_PRICE_YEARLY!,
};
export const getPriceIDFromType = (planType: string) => priceIDMap[planType];
