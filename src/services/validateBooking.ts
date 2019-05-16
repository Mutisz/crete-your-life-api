import { Prisma } from "../codegen/prisma/client";
import { MutationResolvers } from "../codegen/resolvers";
import { BookingDateOccupancy } from "../@types/crete-your-life/BookingDateOccupancy";

import ValidationError from "../errors/ValidationError";

import { curry, head, last, reduce, sortBy } from "lodash";
import { findGlobalLockedDateRanges } from "../repositories/lockedDateIntervalRepository";
import calculateBookingDatesOccupancy from "./calculateBookingDatesOccupancy";

const getFirstAndLastDate = (
  bookingDates: MutationResolvers.BookingDateInput[]
): { firstDate: string | null; lastDate: string | null } => {
  const sortedDates = sortBy(bookingDates, "date");
  const firstDate = head(sortedDates);
  const lastDate = last(sortedDates);
  return {
    firstDate: firstDate ? firstDate.date : null,
    lastDate: lastDate ? lastDate.date : null
  };
};

const validateBookingDatesLock = async (
  prisma: Prisma,
  { bookingDates }: MutationResolvers.BookingCreateInput
): Promise<void> => {
  const { firstDate, lastDate } = getFirstAndLastDate(bookingDates);
  const lockedDates =
    firstDate && lastDate
      ? await findGlobalLockedDateRanges(prisma, firstDate, lastDate)
      : [];
  if (lockedDates.length > 0) {
    throw new ValidationError("bookingDatesLocked");
  }
};

const addBookingDateOccupancyValidation = curry(
  (
    addedPersonCount: number,
    acc: string[],
    bookingDateOccupancy: BookingDateOccupancy
  ): string[] => {
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
  { bookingDates, personCount }: MutationResolvers.BookingCreateInput
): Promise<void> => {
  const { firstDate, lastDate } = getFirstAndLastDate(bookingDates);
  const bookingDatesOccupancy =
    firstDate && lastDate
      ? await calculateBookingDatesOccupancy(prisma, firstDate, lastDate)
      : [];

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
  bookingDates
}: MutationResolvers.BookingCreateInput): void => {
  const hasDates = bookingDates.length > 0;
  if (!hasDates) {
    throw new ValidationError("bookingDatesEmpty");
  }
};

const validateBooking = async (
  prisma: Prisma,
  input: MutationResolvers.BookingCreateInput
): Promise<void> => {
  validateBookingHasDates(input);
  await validateBookingDatesOccupancy(prisma, input);
  await validateBookingDatesLock(prisma, input);
};

export default validateBooking;
