import { find, reduce } from "lodash";

const getBookingDatesPayload = (fromDate, toDate) => ({
  where: {
    date_gte: fromDate,
    date_lte: toDate,
    NOT: { activity: null },
  },
  orderBy: "date_ASC",
});

export const BookingDate = {
  booking: (parent, args, { prisma }) =>
    prisma.bookingDate({ id: parent.id }).booking(),
  activity: (parent, args, { prisma }) =>
    prisma.bookingDate({ id: parent.id }).activity(),
};

export const Query = {
  bookingDatesOccupancy: async (parent, { fromDate, toDate }, { prisma }) => {
    const bookingDates = await prisma.bookingDates(
      getBookingDatesPayload(fromDate, toDate),
    );

    return reduce(
      bookingDates,
      async (bookingDatesOccupancyPromise, { date, id }) => {
        const bookingDatesOccupancy = await bookingDatesOccupancyPromise;
        const booking = await prisma.bookingDate({ id }).booking();
        const activity = await prisma.bookingDate({ id }).activity();
        const existing = find(bookingDatesOccupancy, ["date", date]);
        if (existing) {
          existing.personCount += booking.personCount;
        } else {
          bookingDatesOccupancy.push({
            date,
            activity,
            personCount: booking.personCount,
          });
        }

        return bookingDatesOccupancy;
      },
      Promise.resolve([]),
    );
  },
};
