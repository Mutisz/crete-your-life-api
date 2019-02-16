import {
  BookingDateOccupancyResolvers,
  QueryResolvers,
} from "../generated/resolvers";
import { Context } from "../types/Context";

import calculateBookingDatesOccupancy from "../services/calculateBookingDatesOccupancy";

const bookingDatesOccupancy = (
  parent: any,
  { fromDate, toDate }: QueryResolvers.ArgsBookingDatesOccupancy,
  { prisma }: Context,
) => calculateBookingDatesOccupancy(prisma, fromDate, toDate);

export const Query = {
  bookingDatesOccupancy,
};

export const Resolvers: BookingDateOccupancyResolvers.Type = {
  ...BookingDateOccupancyResolvers.defaultResolvers,
};
