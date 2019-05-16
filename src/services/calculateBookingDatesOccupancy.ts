import { BookingDate, Prisma } from "../codegen/prisma/client";
import { BookingDateOccupancy } from "../@types/crete-your-life/BookingDateOccupancy";

import { curry, find, reduce } from "lodash";
import { findBookingDatesWithActivity } from "../repositories/bookingDates";

const addBookingDateOccupancy = curry(
  async (
    prisma: Prisma,
    accPromise: Promise<BookingDateOccupancy[]>,
    { bookingDateId, date }: BookingDate
  ): Promise<BookingDateOccupancy[]> => {
    const acc = await accPromise;

    const booking = await prisma.bookingDate({ bookingDateId }).booking();
    const activity = await prisma.bookingDate({ bookingDateId }).activity();

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
        personCount
      }
    ];
  }
);

const calculateBookingDatesOccupancy = async (
  prisma: Prisma,
  startDate: string,
  endDate: string
): Promise<BookingDateOccupancy[]> =>
  reduce(
    await findBookingDatesWithActivity(prisma, startDate, endDate),
    addBookingDateOccupancy(prisma),
    Promise.resolve([])
  );

export default calculateBookingDatesOccupancy;
