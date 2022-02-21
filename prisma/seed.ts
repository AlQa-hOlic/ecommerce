import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.delete({ where: { email: "test@embrandiris.com" } });
  const user = await prisma.user.create({
    data: {
      email: "test@embrandiris.com",
      name: "Test User",
      role: "ADMIN",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Dal Tadka",
        imageUrl: "/dal_tadka.jpg",
        price: 249.0,
      },
      {
        name: "Spices",
        imageUrl: "/spices.jpg",
        price: 999.0,
      },
      {
        name: "Paneer Chawal",
        imageUrl: "/paneer_chawal.jpg",
        price: 230.0,
      },
      {
        name: "Paneer Salad",
        imageUrl: "/paneer_salad.jpg",
        price: 140.0,
      },
      {
        name: "Pizza",
        imageUrl: "/pizza.jpg",
        price: 480.0,
      },
      {
        name: "Rasberry Rush",
        imageUrl: "/rasberry_rush.jpg",
        price: 180.0,
      },
      {
        name: "Sandwich",
        imageUrl: "/sandwich.jpg",
        price: 110.0,
      },
      {
        name: "Waffles",
        imageUrl: "/waffles.jpg",
        price: 149.0,
      },
    ],
  });

  let products = await prisma.product.findMany({
    where: {
      price: {
        lte: 480,
      },
    },
  });

  await prisma.wishlistItem.createMany({
    data: products.map((p) => ({
      userEmail: user.email,
      productId: p.id,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
