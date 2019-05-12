import { CurrencyResolvers } from "../codegen/resolvers";
import {
  FragmentableArray,
  Currency,
  CurrencyPromise
} from "../codegen/prisma/client";
import { Context } from "../@types/crete-your-life/Context";

import { map } from "lodash";

const fetchLatestCurrencyRates = async currency => await currency.latest();

const getUpsertCurrencyPayload = (rate, code, date) => ({
  create: { code, rate, date },
  update: { rate, date },
  where: { code }
});

const currencies = (
  _parent: unknown,
  _args: unknown,
  { prisma }: Context
): FragmentableArray<Currency> => prisma.currencies({ orderBy: "code_ASC" });

const updateCurrencyRates = async (
  _parent: unknown,
  _args: unknown,
  { prisma, currency }: Context
): Promise<Currency[]> => {
  const { date, rates } = await fetchLatestCurrencyRates(currency);
  return Promise.all(
    map(
      rates,
      (rate, code): CurrencyPromise =>
        prisma.upsertCurrency(getUpsertCurrencyPayload(rate, code, date))
    )
  );
};

export const Query = {
  currencies
};

export const Mutation = { updateCurrencyRates };

export const Resolvers: CurrencyResolvers.Type = {
  ...CurrencyResolvers.defaultResolvers
};
