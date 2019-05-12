import {
  Prisma,
  FragmentableArray,
  BookingDate,
  Booking,
  BookingCreateInput,
  BookingDateCreateManyWithoutBookingInput,
  BookingDateCreateWithoutBookingInput
} from "../codegen/prisma/client";
import {
  BookingResolvers,
  MutationResolvers,
  QueryResolvers
} from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";

import { map } from "lodash";
import shortid from "shortid";

import calculateBookingPrice from "../services/calculateBookingPrice";
import validateBooking from "../services/validateBooking";

const getCreateBookingDatePayload = (
  bookingDate: MutationResolvers.BookingDateInput
): BookingDateCreateWithoutBookingInput => ({
  activity: bookingDate.activity
    ? { connect: { name: bookingDate.activity } }
    : null,
  date: bookingDate.date
});

const getCreateBookingDatesPayload = (
  data: MutationResolvers.BookingCreateInput
): BookingDateCreateManyWithoutBookingInput => ({
  create: map(data.dates, getCreateBookingDatePayload)
});

const getCreateBookingPayload = async (
  prisma: Prisma,
  data: MutationResolvers.BookingCreateInput
): Promise<BookingCreateInput> => ({
  ...data,
  dates: getCreateBookingDatesPayload(data),
  number: shortid.generate(),
  priceTotal: await calculateBookingPrice(prisma, data.personCount, data.dates)
});

const booking = (
  _parent: unknown,
  args: QueryResolvers.ArgsBooking,
  { prisma }: Context
): Promise<Booking> => {
  return prisma.booking({ number: args.number }) as Promise<Booking>;
};

const bookingPrice = (
  _parent: unknown,
  args: QueryResolvers.ArgsBookingPrice,
  { prisma }: Context
): Promise<number> =>
  calculateBookingPrice(prisma, args.data.personCount, args.data.dates);

const createBooking = async (
  _parent: unknown,
  args: MutationResolvers.ArgsCreateBooking,
  { prisma }: Context
): Promise<Booking> => {
  const { data } = args;

  await validateBooking(prisma, data);
  const payload = await getCreateBookingPayload(prisma, data);

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
  dates: (parent, _args, { prisma }): FragmentableArray<BookingDate> =>
    prisma.booking({ number: parent.number }).dates()
};
