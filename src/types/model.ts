import { Activity } from "../generated/client";

export interface BookingDateOccupancy {
  date: string;
  activity: Activity;
  personCount: number;
}
