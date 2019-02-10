import { map } from "lodash";

import { CurrencyResolvers } from "../generated/resolvers";
import { Context } from "../types/Context";

const upsertCurrencyPayload = (rate, code, date) => ({
  create: { code, rate, date },
  update: { rate, date },
  where: { code },
});

const getLatestCurrencyRates = async (currency) => await currency.latest();

const currencies = (parent: any, args: any, { prisma }: Context) =>
  prisma.currencies({ orderBy: "code_ASC" });

const updateCurrencyRates = async (
  parent: any,
  args: any,
  { prisma, currency }: Context,
) => {
  const { date, rates } = await getLatestCurrencyRates(currency);
  return Promise.all(
    map(rates, (rate, code) =>
      prisma.upsertCurrency(upsertCurrencyPayload(rate, code, date)),
    ),
  );
};

export const Query = {
  currencies,
};

export const Mutation = { updateCurrencyRates };

export const Resolvers: CurrencyResolvers.Type = {
  ...CurrencyResolvers.defaultResolvers,
};
