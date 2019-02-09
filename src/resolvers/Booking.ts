import { curry, map, reduce } from "lodash";
import shortid from "shortid";

import {
  BookingCreateInput as PrismaBookingCreateInput,
  Prisma,
} from "../generated/client";
import {
  BookingResolvers,
  MutationResolvers,
  QueryResolvers,
} from "../generated/resolvers";
import { Context } from "../types/Context";

const addBookingPriceForDate = curry(
  async (
    prisma: Prisma,
    personCount: number,
    accPromise: Promise<number>,
    date: QueryResolvers.BookingDateInput,
  ) => {
    const acc = await accPromise;

    const activityName = date.activity;
    if (activityName === null) {
      return acc;
    }

    const activity = await prisma.activity({ name: activityName });
    if (activity === null) {
      throw new Error("Activity not found");
    }

    return acc + personCount * activity.pricePerPerson;
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

const getCreateBookingDatesPayload = (
  data: MutationResolvers.BookingCreateInput,
) => ({
  create: map(data.dates, (bookingDate) => ({
    activity: bookingDate.activity
      ? { connect: { name: bookingDate.activity } }
      : null,
    date: bookingDate.date,
  })),
});

const getCreateBookingPayload = async (
  prisma: Prisma,
  data: MutationResolvers.BookingCreateInput,
): Promise<PrismaBookingCreateInput> => ({
  ...data,
  dates: getCreateBookingDatesPayload(data),
  number: shortid.generate(),
  priceTotal: await calculateBookingPrice(prisma, data.personCount, data.dates),
});

const booking = (
  parent,
  args: QueryResolvers.ArgsBooking,
  { prisma }: Context,
) => prisma.booking({ number: args.number });

const bookingPrice = async (
  parent,
  args: QueryResolvers.ArgsBookingPrice,
  { prisma }: Context,
) => calculateBookingPrice(prisma, args.data.personCount, args.data.dates);

const createBooking = async (
  parent,
  args: MutationResolvers.ArgsCreateBooking,
  { prisma }: Context,
) => prisma.createBooking(await getCreateBookingPayload(prisma, args.data));

export const Query = {
  booking,
  bookingPrice,
};

export const Mutation = {
  createBooking,
};

export const Resolvers: BookingResolvers.Type = {
  ...BookingResolvers.defaultResolvers,
  dates: (parent, args, { prisma }) =>
    prisma.booking({ number: parent.number }).dates(),
};
