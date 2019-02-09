import { QueryResolvers } from "../generated/resolvers";
import { Query as ActivityQuery } from "./Activity";
import { Query as BookingQuery } from "./Booking";
import { Query as BookingDateOccupancyQuery } from "./BookingDateOccupancy";
import { Query as CurrencyQuery } from "./Currency";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  ...ActivityQuery,
  ...BookingQuery,
  ...BookingDateOccupancyQuery,
  ...CurrencyQuery,
};
