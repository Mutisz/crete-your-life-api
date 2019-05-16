import { ActivityPromise, BookingPromise } from "../codegen/prisma/client";
import { BookingDateResolvers } from "../codegen/resolvers";

export const Resolvers: BookingDateResolvers.Type = {
  ...BookingDateResolvers.defaultResolvers,
  activity: ({ bookingDateId }, _args, { prisma }): ActivityPromise =>
    prisma.bookingDate({ bookingDateId }).activity(),
  booking: ({ bookingDateId }, _args, { prisma }): BookingPromise =>
    prisma.bookingDate({ bookingDateId }).booking()
};
