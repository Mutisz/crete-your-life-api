export interface Activity {
  name: string;
  shortDescription: string;
  description: string;
  pricePerPerson: number;
  minPersonCount: number;
  maxPersonCount: number;
  category: string;
  difficulty: string;
  earliestStartHour: string | null;
  latestStartHour: string | null;
  durationHours: string | null;
  translations: ActivityTranslation[];
  images: Image[];
}

export interface ActivityTranslation {
  name: string;
  language: string;
  shortDescription: string;
  description: string;
}

export interface Image {
  isThumbnail: boolean;
  filePath: string;
  fileName: string;
  url: string | null;
}

export interface Booking {
  number: string;
  email: string;
  phone: string;
  personCount: number;
  priceTotal: number;
  preferredLanguage: string;
  dates: BookingDate[];
}

export interface BookingDate {
  date: string;
  activity: Activity;
}

export interface BookingDateOccupancy {
  date: string;
  personCount: number;
}

export interface Currency {
  code: string;
  rate: number;
  date: string;
}
