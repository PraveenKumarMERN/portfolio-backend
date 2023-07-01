import { PrismaClient } from "@prisma/client";
import { users } from "./user";

const prisma = new PrismaClient();

const loadSeeders = async () => {
  try {
    const usersInput = await users(1);
    await prisma.user.createMany({ data: usersInput });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

loadSeeders();
