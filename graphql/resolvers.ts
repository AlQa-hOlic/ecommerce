import prisma from "../prisma/client";

export const resolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      if (context.session) {
        return context.session.user;
      }

      return null;
    },
    products: async (parent, args, context, info) => {
      const { filter, skip, take } = args;

      const where = filter
        ? {
            OR: [
              { name: { contains: filter } },
              { imageUrl: { contains: filter } },
            ],
          }
        : {};

      let data = prisma.product.findMany({ where, skip, take });

      return data;
    },
    wishlist: async (parent, args, context, info) => {
      if (!context.session) {
        throw new Error("You must be authenticated to access wishlist!");
      }

      const { skip, take } = args;

      let data = prisma.product.findMany({
        skip,
        take,
        where: {
          wishlistItems: {
            some: {
              user: {
                email: context.session.user.email,
              },
            },
          },
        },
      });

      return data;
    },
  },
  Product: {
    isWishlisted: async (parent, args, context, info) => {
      if (context.session) {
        let wishlistItem = await prisma.wishlistItem.findFirst({
          where: {
            user: {
              email: context.session.user.email,
            },
            product: {
              id: parent.id,
            },
          },
        });

        return wishlistItem !== null;
      }

      throw new Error("You must be authenticated to access wishlist!");
    },
  },
};
