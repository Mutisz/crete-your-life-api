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
import { BookingDate, Query as BookingDateQuery } from "./BookingDate";
import Image from "./Image";

const resolvers = {
  Activity,
  Booking,
  BookingDate,
  Image,
  Query: Object.assign(
    CurrencyQuery,
    ActivityQuery,
    BookingQuery,
    BookingDateQuery
  ),
  Mutation: Object.assign(CurrencyMutation, BookingMutation)
};

export default resolvers;
