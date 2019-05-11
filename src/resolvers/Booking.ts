import { map } from "lodash";
import shortid from "shortid";

import calculateBookingPrice from "../services/calculateBookingPrice";
import validateBooking from "../services/validateBooking";

import {
  BookingCreateInput as PrismaBookingCreateInput,
  Prisma
} from "../codegen/prisma/client";
import {
  BookingResolvers,
  MutationResolvers,
  QueryResolvers
} from "../codegen/resolvers";
import { Context } from "../types/Context";

const createBookingDatesPayload = (
  data: MutationResolvers.BookingCreateInput
) => ({
  create: map(data.dates, bookingDate => ({
    activity: bookingDate.activity
      ? { connect: { name: bookingDate.activity } }
      : null,
    date: bookingDate.date
  }))
});

const createBookingPayload = async (
  prisma: Prisma,
  data: MutationResolvers.BookingCreateInput
): Promise<PrismaBookingCreateInput> => ({
  ...data,
  dates: createBookingDatesPayload(data),
  number: shortid.generate(),
  priceTotal: await calculateBookingPrice(prisma, data.personCount, data.dates)
});

const booking = (
  parent: any,
  args: QueryResolvers.ArgsBooking,
  { prisma }: Context
) => {
  return prisma.booking({ number: args.number });
};

const bookingPrice = (
  parent: any,
  args: QueryResolvers.ArgsBookingPrice,
  { prisma }: Context
) => calculateBookingPrice(prisma, args.data.personCount, args.data.dates);

const createBooking = async (
  parent: any,
  args: MutationResolvers.ArgsCreateBooking,
  { prisma }: Context
) => {
  const { data } = args;

  await validateBooking(prisma, data);
  const payload = await createBookingPayload(prisma, data);

  return prisma.createBooking(payload);
};

export const Query = {
  booking,
  bookingPrice
};

export const Mutation = {
  createBooking
};

export const Resolvers: BookingResolvers.Type = {
  ...BookingResolvers.defaultResolvers,
  dates: (parent, args, { prisma }) =>
    prisma.booking({ number: parent.number }).dates()
};
