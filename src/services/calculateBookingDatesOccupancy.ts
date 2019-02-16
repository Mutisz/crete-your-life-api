import { BookingDate, Prisma } from "../generated/client";
import { BookingDateOccupancy } from "../types/model";

import { curry, find, reduce } from "lodash";
import { findBookingDatesWithActivity } from "../repositories/bookingDates";

const addBookingDateOccupancy = curry(
  async (
    prisma: Prisma,
    accPromise: Promise<BookingDateOccupancy[]>,
    { date, id }: BookingDate,
  ): Promise<BookingDateOccupancy[]> => {
    const acc = await accPromise;

    const booking = await prisma.bookingDate({ id }).booking();
    const activity = await prisma.bookingDate({ id }).activity();

    const { personCount } = booking;
    const existingOccupancy = find(acc, { date, activity });
    if (existingOccupancy) {
      existingOccupancy.personCount += personCount;
      return acc;
    }

    return [
      ...acc,
      {
        activity,
        date,
        personCount,
      },
    ];
  },
);

const calculateBookingDatesOccupancy = async (
  prisma: Prisma,
  fromDate: string,
  toDate: string,
): Promise<BookingDateOccupancy[]> =>
  reduce(
    await findBookingDatesWithActivity(prisma, fromDate, toDate),
    addBookingDateOccupancy(prisma),
    Promise.resolve([]),
  );

export default calculateBookingDatesOccupancy;
