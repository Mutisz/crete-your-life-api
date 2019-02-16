import { QueryResolvers } from "../generated/resolvers";
import { Context } from "../types/Context";

import { map } from "lodash";
import { findLockedDates } from "../repositories/lockedDates";

const lockedDates = async (
  parent: any,
  { fromDate, toDate }: QueryResolvers.ArgsLockedDates,
  { prisma }: Context,
) => map(await findLockedDates(prisma, fromDate, toDate), (date) => date.date);

export const Query = {
  lockedDates,
};
