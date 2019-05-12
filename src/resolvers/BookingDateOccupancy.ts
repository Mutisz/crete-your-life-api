import {
  BookingDateOccupancyResolvers,
  QueryResolvers
} from "../codegen/resolvers";
import { Context } from "../@types/crete-your-life/Context";
import { BookingDateOccupancy } from "../@types/crete-your-life/BookingDateOccupancy";

import calculateBookingDatesOccupancy from "../services/calculateBookingDatesOccupancy";

const bookingDatesOccupancy = (
  _parent: unknown,
  { fromDate, toDate }: QueryResolvers.ArgsBookingDatesOccupancy,
  { prisma }: Context
): Promise<BookingDateOccupancy[]> =>
  calculateBookingDatesOccupancy(prisma, fromDate, toDate);

export const Query = {
  bookingDatesOccupancy
};

export const Resolvers: BookingDateOccupancyResolvers.Type = {
  ...BookingDateOccupancyResolvers.defaultResolvers
};
