import Fixer, { RatesResponse } from "fixer-node";
import { CurrencyResolvers } from "../codegen/resolvers";
import {
  FragmentableArray,
  Currency,
  CurrencyPromise
} from "../codegen/prisma/client";
import { Context } from "../@types/crete-your-life/Context";

import { map } from "lodash";

const fetchLatestCurrencyRates = async (
  currency: Fixer
): Promise<RatesResponse> => await currency.latest();

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
        prisma.upsertCurrency({
          create: { code, rate, date },
          update: { rate, date },
          where: { code }
        })
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
