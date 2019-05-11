import { Prisma } from "../codegen/prisma/client";

export const findBookingDatesWithActivity = (
  prisma: Prisma,
  fromDate: string,
  toDate: string
) =>
  prisma.bookingDates({
    orderBy: "date_ASC",
    where: {
      NOT: { activity: null },
      date_gte: fromDate,
      date_lte: toDate
    }
  });
