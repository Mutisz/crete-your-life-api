import {
  Query as CurrencyQuery,
  Mutation as CurrencyMutation
} from "./Currency";
import { Activity, Query as ActivityQuery } from "./Activity";
import {
  Booking,
  Query as BookingQuery,
  Mutation as BookingMutation
} from "./Booking";
import BookingDate from "./BookingDate";
import Image from "./Image";

const resolvers = {
  Activity,
  Booking,
  BookingDate,
  Image,
  Query: Object.assign(CurrencyQuery, ActivityQuery, BookingQuery),
  Mutation: Object.assign(CurrencyMutation, BookingMutation)
};

export default resolvers;
