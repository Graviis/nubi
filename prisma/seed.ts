import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createTestOrganizationAndAddCarlos = await prisma.organization.create({
    data: {
      name: "Test Organization",
      users: {
        connect: { email: "carlos@carlos.com" },
      },
      histories: {
        create: [
          {
            name: "Historia1",
            status: "DRAFT",
            doctor: "Gabriel",
            surgeryDate: new Date(),
            surgeryType: "DEPOSIT",
            notes: "wola",
            changes: {
              create: { to: "DRAFT" },
            },
          },
          {
            name: "Historia2",
            status: "ON_REVIEW",
            doctor: "Gabriel",
            surgeryDate: new Date(),
            surgeryType: "DEPOSIT",
            notes: "wola",
            changes: {
              createMany: {
                data: [{ to: "DRAFT" }, { from: "DRAFT", to: "ON_REVIEW" }],
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
