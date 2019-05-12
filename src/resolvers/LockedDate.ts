import { QueryResolvers } from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";

import { map } from "lodash";
import { findLockedDates } from "../repositories/lockedDates";

const lockedDates = async (
  _parent: unknown,
  { fromDate, toDate }: QueryResolvers.ArgsLockedDates,
  { prisma }: Context
): Promise<string[]> =>
  map(
    await findLockedDates(prisma, fromDate, toDate),
    (date): string => date.date
  );

export const Query = {
  lockedDates
};
