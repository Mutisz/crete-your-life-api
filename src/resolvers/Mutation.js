import { map } from "lodash";
import uuidv1 from "uuid/v1";

const getLatestCurrencyRates = async currency => await currency.latest();

const createBookingPayload = data => ({
  ...data,
  number: uuidv1(),
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

const Mutation = {
  createBooking: (parent, { data }, { prisma }, info) =>
    prisma.createBooking(createBookingPayload(data), info),
  updateCurrencyRates: async (parent, args, { prisma, currency }) => {
    const latest = await getLatestCurrencyRates(currency);
    const { date, rates } = latest;
    return map(rates, (rate, code) =>
      prisma.upsertCurrency(upsertCurrencyPayload(rate, code, date))
    );
  }
};

export default Mutation;
