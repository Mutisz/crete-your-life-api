export const Activity = {
  translations: (parent, args, { prisma }) =>
    prisma.activity({ name: parent.name }).translations(),
  images: (parent, args, { prisma }) =>
    prisma.activity({ name: parent.name }).images(),
};

export const Query = {
  activities: (parent, args, { prisma }, info) =>
    prisma.activities({ orderBy: "name_ASC" }, info),
  activity: (parent, { name }, { prisma }, info) =>
    prisma.activity({ name }, info),
};
