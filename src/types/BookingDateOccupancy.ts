import { Activity } from "../codegen/prisma/client";

export interface BookingDateOccupancy {
  date: string;
  activity: Activity;
  personCount: number;
}
