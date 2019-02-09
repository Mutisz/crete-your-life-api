import { curry, find, reduce } from "lodash";

import { BookingDate, Prisma } from "../generated/client";
import {
  BookingDateOccupancyResolvers,
  QueryResolvers,
} from "../generated/resolvers";
import { Context } from "../types/Context";
import { BookingDateOccupancy } from "../types/model";

const findOccupiedBookingDates = (
  prisma: Prisma,
  fromDate: string,
  toDate: string,
) =>
  prisma.bookingDates({
    orderBy: "date_ASC",
    where: {
      NOT: { activity: null },
      date_gte: fromDate,
      date_lte: toDate,
    },
  });

const appendBookingDateOccupancy = curry(
  async (
    prisma: Prisma,
    accPromise: Promise<BookingDateOccupancy[]>,
    { date, id }: BookingDate,
  ): Promise<BookingDateOccupancy[]> => {
    const acc = await accPromise;

    const bookingDate = prisma.bookingDate({ id });
    const booking = await bookingDate.booking();

    const { personCount } = booking;
    const existing = find(acc, ["date", date]);
    if (existing) {
      existing.personCount += personCount;
      return acc;
    }

    return [
      ...acc,
      {
        activity: await bookingDate.activity(),
        date,
        personCount,
      },
    ];
  },
);

const bookingDatesOccupancy = async (
  parent,
  { fromDate, toDate }: QueryResolvers.ArgsBookingDatesOccupancy,
  { prisma }: Context,
) =>
  reduce(
    await findOccupiedBookingDates(prisma, fromDate, toDate),
    appendBookingDateOccupancy(prisma),
    Promise.resolve([]),
  );

export const Query = {
  bookingDatesOccupancy,
};

export const Resolvers: BookingDateOccupancyResolvers.Type = {
  ...BookingDateOccupancyResolvers.defaultResolvers,
};
