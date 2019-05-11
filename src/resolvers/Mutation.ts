import { MutationResolvers } from "../codegen/resolvers";
import { Mutation as BookingMutation } from "./Booking";
import { Mutation as CurrencyMutation } from "./Currency";

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  ...BookingMutation,
  ...CurrencyMutation
};
