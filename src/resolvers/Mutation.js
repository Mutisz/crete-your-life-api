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

const createBookingPayload = async (prisma, data) => ({
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

const upsertCurrencyPayload = (rate, code, date) => ({
  where: { code },
  update: { rate, date },
  create: { code, rate, date }
});

const getLatestCurrencyRates = async currency => await currency.latest();

const Mutation = {
  calculateBookingPrice: async (parent, { data }, { prisma }) =>
    calculateBookingPrice(prisma, data),
  createBooking: async (parent, { data }, { prisma }, info) =>
    prisma.createBooking(await createBookingPayload(data), info),
  updateCurrencyRates: async (parent, args, { prisma, currency }) => {
    const latest = await getLatestCurrencyRates(currency);
    const { date, rates } = latest;
    return map(rates, (rate, code) =>
      prisma.upsertCurrency(upsertCurrencyPayload(rate, code, date))
    );
  }
};

export default Mutation;
