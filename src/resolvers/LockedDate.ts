import { map } from "lodash";
import { findLockedDates } from "../repositories/lockedDates";

import { QueryResolvers } from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";

const lockedDates = async (
  parent,
  { fromDate, toDate }: QueryResolvers.ArgsLockedDates,
  { prisma }: Context
) => map(await findLockedDates(prisma, fromDate, toDate), date => date.date);

export const Query = {
  lockedDates
};
