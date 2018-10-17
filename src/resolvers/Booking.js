import { curry, reduce, map, get } from "lodash";
import shortid from "shortid";

const calculateBookingDatePrice = curry(
  async (prisma, personCount, totalPricePromise, date) => {
    const totalPrice = await totalPricePromise;
    const activityName = get(date, "activity", null);
    if (activityName === null) {
      return await totalPrice;
    }

    const activity = await prisma.activity({ name: activityName });
    if (activity === null) {
      throw new Error("Activity not found");
    }

    return totalPrice + get(activity, "pricePerPerson");
  }
);

const calculateBookingPrice = async (prisma, { personCount, dates }) =>
  reduce(
    dates,
    calculateBookingDatePrice(prisma, personCount),
    Promise.resolve(0)
  );

const getBookingDatesPayload = (fromDate, toDate) => ({
  where: {
    date_gte: fromDate,
    date_lte: toDate,
    NOT: { activity: null }
  },
  orderBy: "date_ASC"
});

const getCreateBookingPayload = async (prisma, data) => ({
  ...data,
  number: shortid.generate(),
  priceTotal: await calculateBookingPrice(prisma, data),
  dates: {
    create: map(data.dates, bookingDate => ({
      date: bookingDate.date,
      activity: bookingDate.activity
        ? { connect: { name: bookingDate.activity } }
        : null
    }))
  }
});

export const Booking = {
  dates: (parent, args, { prisma }) =>
    prisma.booking({ number: parent.number }).dates()
};

export const Query = {
  bookingPrice: async (parent, { data }, { prisma }) =>
    calculateBookingPrice(prisma, data),
  booking: (parent, { number }, { prisma }, info) =>
    prisma.booking({ number }, info),
  bookingDates: (parent, { fromDate, toDate }, { prisma }, info) =>
    prisma.bookingDates(getBookingDatesPayload(fromDate, toDate), info)
};

export const Mutation = {
  createBooking: async (parent, { data }, { prisma }, info) =>
    prisma.createBooking(await getCreateBookingPayload(data), info)
};
