import { curry, reduce } from "lodash";

import { Prisma } from "../../generated/client";
import { QueryResolvers } from "../../generated/resolvers";

const calculateBookingPriceForDate = async (
  prisma: Prisma,
  personCount: number,
  date: QueryResolvers.BookingDateInput,
) => {
  const activityName = date.activity;
  if (activityName !== null) {
    const activity = await prisma.activity({ name: activityName });
    return personCount * activity.pricePerPerson;
  }

  return 0;
};

const addBookingPriceForDate = curry(
  async (
    prisma: Prisma,
    personCount: number,
    accPromise: Promise<number>,
    date: QueryResolvers.BookingDateInput,
  ) => {
    const priceForDate = await calculateBookingPriceForDate(
      prisma,
      personCount,
      date,
    );

    return (await accPromise) + priceForDate;
  },
);

const calculateBookingPrice = async (
  prisma: Prisma,
  personCount: number,
  dates: QueryResolvers.BookingDateInput[],
) =>
  reduce(
    dates,
    addBookingPriceForDate(prisma, personCount),
    Promise.resolve(0),
  );

export default calculateBookingPrice;
