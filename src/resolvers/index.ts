import { Resolvers as ActivityResolvers } from "./Activity";
import { Resolvers as ActivityTranslationResolvers } from "./ActivityTranslation";
import { Resolvers as BookingResolvers } from "./Booking";
import { Resolvers as BookingDateResolvers } from "./BookingDate";
import { Resolvers as BookingDateOccupancyResolvers } from "./BookingDateOccupancy";
import { Resolvers as CurrencyResolvers } from "./Currency";
import { Resolvers as ImageResolvers } from "./Image";

import { Mutation } from "./Mutation";
import { Query } from "./Query";

import { Resolvers } from "../generated/resolvers";

const resolvers: Resolvers = {
  Activity: ActivityResolvers,
  ActivityTranslation: ActivityTranslationResolvers,
  Booking: BookingResolvers,
  BookingDate: BookingDateResolvers,
  BookingDateOccupancy: BookingDateOccupancyResolvers,
  Currency: CurrencyResolvers,
  Image: ImageResolvers,
  Mutation,
  Query,
};

export default resolvers;
