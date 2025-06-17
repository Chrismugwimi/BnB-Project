import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const kenyaCounties = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Garissa",
  "Kakamega",
];

async function main() {
  // Create sample users
  const host = await prisma.user.create({
    data: {
      email: "host@example.com",
      name: "John Kamau",
      role: "HOST",
      phone: "+254700000000",
    },
  });

  const guest = await prisma.user.create({
    data: {
      email: "guest@example.com",
      name: "Mary Wanjiku",
      role: Role.GUEST,
      phone: "+254700000001",
    },
  });

  // Create sample properties
  for (let i = 0; i < 5; i++) {
    await prisma.property.create({
      data: {
        title: `Beautiful BnB in ${kenyaCounties[i]}`,
        description: `A lovely place to stay in ${kenyaCounties[i]}, Kenya`,
        price: 5000 + i * 1000,
        maxGuests: 2 + i,
        bedrooms: 1 + Math.floor(i / 2),
        bathrooms: 1,
        county: kenyaCounties[i],
        city: kenyaCounties[i],
        location: `https://maps.google.com/?q=${kenyaCounties[i]}`,
        images: [`/images/property-${i + 1}.jpg`],
        amenities: ["wifi", "parking", "kitchen"],
        ownerId: host.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
