import { Activity, Query as ActivityQuery } from "./Activity";
import {
  Booking,
  Mutation as BookingMutation,
  Query as BookingQuery,
} from "./Booking";
import { BookingDate, Query as BookingDateQuery } from "./BookingDate";
import {
  Mutation as CurrencyMutation,
  Query as CurrencyQuery,
} from "./Currency";
import Image from "./Image";

const resolvers = {
  Activity,
  Booking,
  BookingDate,
  Image,
  Mutation: Object.assign(CurrencyMutation, BookingMutation),
  Query: Object.assign(
    CurrencyQuery,
    ActivityQuery,
    BookingQuery,
    BookingDateQuery,
  ),
};

export default resolvers;
