import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1️⃣ Create a superadmin
  // const superadminPassword = await bcrypt.hash("supersecret", 10);
  // const superadmin = await prisma.user.upsert({
  //   where: { email: "superadmin@example.com" },
  //   update: {},
  //   create: {
  //     name: "Super Admin",
  //     email: "superadmin@example.com",
  //     password: superadminPassword,
  //     role: "superadmin",
  //   },
  // });
  // console.log("Created superadmin:", superadmin.email);

  // // 2️⃣ Create 5 admin users
  // const adminUsersData = Array.from({ length: 5 }).map((_, i) => ({
  //   name: `Admin ${i + 1}`,
  //   email: `admin${i + 1}@example.com`,
  //   password: `adminpass${i + 1}`,
  // }));

  // const adminUsers = [];
  // for (const u of adminUsersData) {
  //   const hashed = await bcrypt.hash(u.password, 10);
  //   const admin = await prisma.user.upsert({
  //     where: { email: u.email },
  //     update: {},
  //     create: {
  //       name: u.name,
  //       email: u.email,
  //       password: hashed,
  //       role: "ADMIN",
  //     },
  //   });
  //   adminUsers.push(admin);
  //   console.log("Created admin:", admin.email);
  // }

  // 3️⃣ Create fests for each admin
  const fests = [];
  for (const admin of adminUsers) {
    const fest = await prisma.fest.upsert({
      where: { name: `${admin.name}'s Fest` },
      update: {},
      create: {
        id: 5,
        name: `${admin.name}'s Fest`,
        type: "Technical",
        created_by_id: admin.id,
      },
    });
    fests.push(fest);
    console.log("Created fest:", fest.name);
  }

  // 4️⃣ Create 10 events distributed across admins
  let eventCount = 0;
  const eventNames = [
    "CodeSprint",
    "Hackathon",
    "TechTalk",
    "AI Workshop",
    "Robotics Challenge",
    "Appathon",
    "Game Jam",
    "Design Sprint",
    "Startup Pitch",
    "Innovation Expo",
  ];

  for (let i = 0; i < 10; i++) {
    const fest = fests[i % fests.length]; // rotate fests
    const admin = adminUsers[i % adminUsers.length];

    const event = await prisma.event.upsert({
      where: { name: eventNames[i] },
      update: {},
      create: {
        name: eventNames[i],
        description: `Description for ${eventNames[i]}`,
        date: new Date(2025, 10, 10 + i), // Nov 11, 12, ...
        venue: i % 2 === 0 ? "CC Lab" : "Seminar Room",
        fest_id: fest.id,
        created_by_id: admin.id,
      },
    });

    console.log("Created event:", event.name);
    eventCount++;
  }

  console.log(`Database seeded successfully with ${eventCount} events!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
