import { curry, head, last, reduce, sortBy } from "lodash";

import calculateBookingDatesOccupancy from "./calculateBookingDatesOccupancy";

import ValidationError from "../errors/ValidationError";

import { Prisma } from "../../generated/client";
import { MutationResolvers } from "../../generated/resolvers";
import { BookingDateOccupancy } from "../../types/model";

const addBookingDateOccupancyValidation = curry(
  (
    addedPersonCount: number,
    acc: string[],
    bookingDateOccupancy: BookingDateOccupancy,
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
  },
);

const validateBookingDatesOccupancy = async (
  prisma: Prisma,
  input: MutationResolvers.BookingCreateInput,
) => {
  const { dates, personCount } = input;
  const sortedDates = sortBy(dates, "date");
  const bookingDatesOccupancy = await calculateBookingDatesOccupancy(
    prisma,
    head(sortedDates).date,
    last(sortedDates).date,
  );

  const invalidDates = reduce(
    bookingDatesOccupancy,
    addBookingDateOccupancyValidation(personCount),
    [],
  );

  if (invalidDates.length > 0) {
    throw new ValidationError("bookingDatesOccupied");
  }
};

const validateBookingHasDates = (
  input: MutationResolvers.BookingCreateInput,
): void => {
  const hasDates = input.dates.length > 0;
  if (!hasDates) {
    throw new ValidationError("bookingDatesEmpty");
  }
};

const validateBooking = async (
  prisma: Prisma,
  input: MutationResolvers.BookingCreateInput,
) => {
  validateBookingHasDates(input);
  await validateBookingDatesOccupancy(prisma, input);
};

export default validateBooking;
