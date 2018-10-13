const Activity = {
  translations: (parent, args, { prisma }) =>
    prisma.activity({ name: parent.name }).translations(),
  images: (parent, args, { prisma }) =>
    prisma.activity({ name: parent.name }).images()
};

export default Activity;
