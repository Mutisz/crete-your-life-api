import {
  BookingDateOccupancyResolvers,
  QueryResolvers
} from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";
import { BookingDateOccupancy } from "../@types/crete-your-life/BookingDateOccupancy";

import calculateBookingDatesOccupancy from "../services/calculateBookingDatesOccupancy";

const bookingDatesOccupancy = (
  _parent: unknown,
  { interval: { start, end } }: QueryResolvers.ArgsBookingDatesOccupancy,
  { prisma }: Context
): Promise<BookingDateOccupancy[]> =>
  calculateBookingDatesOccupancy(prisma, start, end);

export const Query = {
  bookingDatesOccupancy
};

export const Resolvers: BookingDateOccupancyResolvers.Type = {
  ...BookingDateOccupancyResolvers.defaultResolvers
};
