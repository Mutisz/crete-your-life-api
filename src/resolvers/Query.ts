import { QueryResolvers } from "../codegen/resolvers";
import { Query as ActivityQuery } from "./Activity";
import { Query as BookingQuery } from "./Booking";
import { Query as BookingDateOccupancyQuery } from "./BookingDateOccupancy";
import { Query as CurrencyQuery } from "./Currency";
import { Query as LockedDateQuery } from "./LockedDate";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  ...ActivityQuery,
  ...BookingQuery,
  ...BookingDateOccupancyQuery,
  ...LockedDateQuery,
  ...CurrencyQuery
};
