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
  console.log("🌱 Starting database seeding...");

  // Create sample users
  const host = await prisma.user.create({
    data: {
      email: "host@example.com",
      name: "John Kamau",
      role: Role.HOST,
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

  console.log("✅ Created users");

  // Create sample properties
  for (let i = 0; i < 5; i++) {
    await prisma.property.create({
      data: {
        title: `Beautiful BnB in ${kenyaCounties[i]}`,
        description: `A lovely place to stay in ${kenyaCounties[i]}, Kenya. Perfect for tourists and business travelers.`,
        price: 5000 + i * 1000,
        maxGuests: 2 + i,
        bedrooms: 1 + Math.floor(i / 2),
        bathrooms: 1,
        county: kenyaCounties[i],
        city: kenyaCounties[i],
        location: `${i + 1} Main Street, ${kenyaCounties[i]}`,
        images: [`/images/property-${i + 1}.jpg`],
        amenities: ["wifi", "parking", "kitchen"],
        hostId: host.id,
      },
    });
  }

  console.log("✅ Created properties");

  // Create a sample booking
  const property = await prisma.property.findFirst();
  let createdBooking = null;

  if (property) {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 7); // 7 days from now

    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 3); // 3 day stay

    createdBooking = await prisma.booking.create({
      data: {
        checkIn,
        checkOut,
        guests: 2,
        totalPrice: property.price.toNumber() * 3, // 3 nights
        propertyId: property.id,
        userId: guest.id,
      },
    });

    console.log("✅ Created sample booking", createdBooking);
  }

  // Get all existing bookings
  const bookings = await prisma.booking.findMany();

  // Create a payment for each booking
  for (const booking of bookings) {
    await prisma.payment.create({
      data: {
        amount: 5000 + Math.floor(Math.random() * 5000), // Random amount between 5000–10000
        method: ["Mpesa", "Card", "Cash"][Math.floor(Math.random() * 3)],
        status: "Paid",
        bookingId: booking.id,
      },
    });
  }

  console.log(`✅ Seeded ${bookings.length} payments`);

  // Create a sample review
  if (property && guest) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment:
          "Amazing place! Very clean and comfortable. Highly recommended.",
        propertyId: property.id,
        reviewerId: guest.id,
      },
    });

    console.log("✅ Created sample review");
  }

  console.log("🎉 Database seeding completed successfully!");
  console.log(`
📊 Summary:
- 1 Host user (host@example.com)
- 1 Guest user (guest@example.com)  
- 5 Properties across Kenya counties
- ${bookings.length} Booking(s)
- ${bookings.length} Payment(s)
- 1 Review
`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
