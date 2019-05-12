import { Prisma } from "../codegen/prisma/client";
import { MutationResolvers } from "../codegen/resolvers";
import { BookingDateOccupancy } from "../@types/crete-your-life/BookingDateOccupancy";

import ValidationError from "../errors/ValidationError";

import { curry, head, last, reduce, sortBy, size } from "lodash";
import { findLockedDates } from "../repositories/lockedDates";
import calculateBookingDatesOccupancy from "./calculateBookingDatesOccupancy";

const getFirstAndLastDate = (
  dates: MutationResolvers.BookingDateInput[]
): { firstDate: string | null; lastDate: string | null } => {
  const sortedDates = sortBy(dates, "date");
  const firstDate = head(sortedDates);
  const lastDate = last(sortedDates);
  return {
    firstDate: firstDate ? firstDate.date : null,
    lastDate: lastDate ? lastDate.date : null
  };
};

const validateBookingDatesLock = async (
  prisma: Prisma,
  { dates }: MutationResolvers.BookingCreateInput
): Promise<void> => {
  const { firstDate, lastDate } = getFirstAndLastDate(dates);
  const lockedDates =
    firstDate && lastDate
      ? await findLockedDates(prisma, firstDate, lastDate)
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
  { dates, personCount }: MutationResolvers.BookingCreateInput
): Promise<void> => {
  const { firstDate, lastDate } = getFirstAndLastDate(dates);
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
  dates
}: MutationResolvers.BookingCreateInput): void => {
  const hasDates = dates.length > 0;
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
