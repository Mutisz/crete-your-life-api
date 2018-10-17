import { map } from "lodash";

const getLatestCurrencyRates = async currency => await currency.latest();

const upsertCurrencyPayload = (rate, code, date) => ({
  where: { code },
  update: { rate, date },
  create: { code, rate, date }
});

export const Query = {
  currencies: (parent, args, { prisma }, info) =>
    prisma.currencies({ orderBy: "code_ASC" }, info)
};

export const Mutation = {
  updateCurrencyRates: async (parent, args, { prisma, currency }) => {
    const latest = await getLatestCurrencyRates(currency);
    const { date, rates } = latest;
    return map(rates, (rate, code) =>
      prisma.upsertCurrency(upsertCurrencyPayload(rate, code, date))
    );
  }
};
