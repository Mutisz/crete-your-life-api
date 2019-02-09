import { BookingDateResolvers } from "../generated/resolvers";

export const Resolvers: BookingDateResolvers.Type = {
  ...BookingDateResolvers.defaultResolvers,
  activity: ({ id }, args, { prisma }) => prisma.bookingDate({ id }).activity(),
  booking: ({ id }, args, { prisma }) => prisma.bookingDate({ id }).booking(),
};
