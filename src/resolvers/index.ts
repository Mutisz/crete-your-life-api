import { IResolvers } from "graphql-tools";
import { Resolvers } from "../codegen/resolvers";

import { Resolvers as ActivityResolvers } from "./Activity";
import { Resolvers as ActivityTranslationResolvers } from "./ActivityTranslation";
import { Resolvers as ActivityCategoryResolvers } from "./ActivityCategory";
import { Resolvers as ActivityCategoryTranslationResolvers } from "./ActivityCategoryTranslation";
import { Resolvers as ActivityLockedDateIntervalResolvers } from "./ActivityLockedDateInterval";
import { Resolvers as BookingResolvers } from "./Booking";
import { Resolvers as BookingDateResolvers } from "./BookingDate";
import { Resolvers as BookingDateOccupancyResolvers } from "./BookingDateOccupancy";
import { Resolvers as CurrencyResolvers } from "./Currency";
import { Resolvers as ImageResolvers } from "./Image";

import { Mutation } from "./Mutation";
import { Query } from "./Query";

const resolvers: Resolvers | IResolvers = {
  Activity: ActivityResolvers,
  ActivityTranslation: ActivityTranslationResolvers,
  ActivityCategory: ActivityCategoryResolvers,
  ActivityCategoryTranslation: ActivityCategoryTranslationResolvers,
  ActivityLockedDateInterval: ActivityLockedDateIntervalResolvers,
  Booking: BookingResolvers,
  BookingDate: BookingDateResolvers,
  BookingDateOccupancy: BookingDateOccupancyResolvers,
  Currency: CurrencyResolvers,
  Image: ImageResolvers,
  Mutation,
  Query
};

export default resolvers;
