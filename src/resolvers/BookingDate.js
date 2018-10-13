const BookingDate = {
  activity: (parent, args, { prisma }) =>
    prisma.bookingDate({ id: parent.id }).activity()
};

export default BookingDate;
