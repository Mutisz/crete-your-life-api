import {
  Prisma,
  FragmentableArray,
  LockedDate
} from "../codegen/prisma/client";

export const findLockedDates = (
  prisma: Prisma,
  fromDate: string,
  toDate: string
): FragmentableArray<LockedDate> =>
  prisma.lockedDates({
    orderBy: "date_ASC",
    where: {
      date_gte: fromDate,
      date_lte: toDate
    }
  });
