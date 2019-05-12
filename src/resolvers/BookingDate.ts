import { ActivityPromise, BookingPromise } from "../codegen/prisma/client";
import { BookingDateResolvers } from "../codegen/resolvers";

export const Resolvers: BookingDateResolvers.Type = {
  ...BookingDateResolvers.defaultResolvers,
  activity: ({ id }, _args, { prisma }): ActivityPromise =>
    prisma.bookingDate({ id }).activity(),
  booking: ({ id }, _args, { prisma }): BookingPromise =>
    prisma.bookingDate({ id }).booking()
};
