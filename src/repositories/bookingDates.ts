import {
  Prisma,
  FragmentableArray,
  BookingDate
} from "../codegen/prisma/client";

export const findBookingDatesWithActivity = (
  prisma: Prisma,
  startDate: string,
  endDate: string
): FragmentableArray<BookingDate> =>
  prisma.bookingDates({
    orderBy: "date_ASC",
    where: {
      NOT: { activity: null },
      date_gte: startDate,
      date_lte: endDate
    }
  });
