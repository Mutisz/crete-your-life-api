const Booking = {
  dates: (parent, args, { prisma }) =>
    prisma.booking({ number: parent.number }).dates()
};

export default Booking;
