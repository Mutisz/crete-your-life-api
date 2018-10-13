const bookingDatesPayload = (fromDate, toDate) => ({
  where: {
    date_gte: fromDate,
    date_lte: toDate,
    NOT: { activity: null }
  },
  orderBy: "date_ASC"
});

const Query = {
  activities: (parent, args, { prisma }, info) =>
    prisma.activities({ orderBy: "name_ASC" }, info),
  currencies: (parent, args, { prisma }, info) =>
    prisma.currencies({ orderBy: "code_ASC" }, info),
  booking: (parent, { number }, { prisma }, info) =>
    prisma.booking({ number }, info),
  bookingDates: (parent, { fromDate, toDate }, { prisma }, info) =>
    prisma.bookingDates(bookingDatesPayload(fromDate, toDate), info)
};

export default Query;
