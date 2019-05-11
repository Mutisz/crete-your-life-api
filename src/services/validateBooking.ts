import ValidationError from "../errors/ValidationError";

import { curry, head, last, reduce, sortBy } from "lodash";
import { findLockedDates } from "../repositories/lockedDates";
import calculateBookingDatesOccupancy from "./calculateBookingDatesOccupancy";

import { Prisma } from "../codegen/prisma/client";
import { MutationResolvers } from "../codegen/resolvers";
import { BookingDateOccupancy } from "../@types/crete-your-life/BookingDateOccupancy";

const getFirstAndLastDate = (
  dates: MutationResolvers.BookingDateInput[]
): { firstDate: string; lastDate: string } => {
  const sortedDates = sortBy(dates, "date");
  return {
    firstDate: head(sortedDates).date,
    lastDate: last(sortedDates).date
  };
};

const validateBookingDatesLock = async (
  prisma: Prisma,
  { dates }: MutationResolvers.BookingCreateInput
) => {
  const { firstDate, lastDate } = getFirstAndLastDate(dates);
  const lockedDates = await findLockedDates(prisma, firstDate, lastDate);
  if (lockedDates.length > 0) {
    throw new ValidationError("bookingDatesLocked");
  }
};

const addBookingDateOccupancyValidation = curry(
  (
    addedPersonCount: number,
    acc: string[],
    bookingDateOccupancy: BookingDateOccupancy
  ) => {
    const { activity, date, personCount } = bookingDateOccupancy;
    const finalPersonCount = personCount + addedPersonCount;
    if (
      finalPersonCount > activity.maxPersonCount ||
      finalPersonCount < activity.minPersonCount
    ) {
      acc.push(date);
    }

    return acc;
  }
);

const validateBookingDatesOccupancy = async (
  prisma: Prisma,
  { dates, personCount }: MutationResolvers.BookingCreateInput
) => {
  const { firstDate, lastDate } = getFirstAndLastDate(dates);
  const bookingDatesOccupancy = await calculateBookingDatesOccupancy(
    prisma,
    firstDate,
    lastDate
  );

  const invalidDates = reduce(
    bookingDatesOccupancy,
    addBookingDateOccupancyValidation(personCount),
    []
  );

  if (invalidDates.length > 0) {
    throw new ValidationError("bookingDatesOccupied");
  }
};

const validateBookingHasDates = ({
  dates
}: MutationResolvers.BookingCreateInput) => {
  const hasDates = dates.length > 0;
  if (!hasDates) {
    throw new ValidationError("bookingDatesEmpty");
  }
};

const validateBooking = async (
  prisma: Prisma,
  input: MutationResolvers.BookingCreateInput
) => {
  validateBookingHasDates(input);
  await validateBookingDatesOccupancy(prisma, input);
  await validateBookingDatesLock(prisma, input);
};

export default validateBooking;
