import { Prisma, Activity } from "../codegen/prisma/client";
import { QueryResolvers } from "../codegen/resolvers";

import { curry, reduce } from "lodash";

const requireActivity = async (
  prisma: Prisma,
  name: string
): Promise<Activity> => {
  const activity = await prisma.activity({ name });
  if (activity === null) {
    throw new Error(`Activity ${name} not found`);
  }

  return activity;
};

const calculateBookingPriceForDate = async (
  prisma: Prisma,
  personCount: number,
  { activityName }: QueryResolvers.BookingDateInput
): Promise<number> => {
  if (activityName !== null) {
    const activity = await requireActivity(prisma, activityName as string);
    return personCount * activity.pricePerPerson;
  }

  return 0;
};

const addBookingPriceForDate = curry(
  async (
    prisma: Prisma,
    personCount: number,
    accPromise: Promise<number>,
    date: QueryResolvers.BookingDateInput
  ): Promise<number> => {
    const priceForDate = await calculateBookingPriceForDate(
      prisma,
      personCount,
      date
    );

    return (await accPromise) + priceForDate;
  }
);

const calculateBookingPrice = async (
  prisma: Prisma,
  personCount: number,
  dates: QueryResolvers.BookingDateInput[]
): Promise<number> =>
  reduce(
    dates,
    addBookingPriceForDate(prisma, personCount),
    Promise.resolve(0)
  );

export default calculateBookingPrice;
