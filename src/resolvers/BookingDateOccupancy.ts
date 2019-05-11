import calculateBookingDatesOccupancy from "../services/calculateBookingDatesOccupancy";

import {
  BookingDateOccupancyResolvers,
  QueryResolvers
} from "../codegen/resolvers";
import { Context } from "../types/Context";

const bookingDatesOccupancy = (
  parent: any,
  { fromDate, toDate }: QueryResolvers.ArgsBookingDatesOccupancy,
  { prisma }: Context
) => calculateBookingDatesOccupancy(prisma, fromDate, toDate);

export const Query = {
  bookingDatesOccupancy
};

export const Resolvers: BookingDateOccupancyResolvers.Type = {
  ...BookingDateOccupancyResolvers.defaultResolvers
};
