import { AdminRole, Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const admins: Prisma.AdminCreateInput[] = [];
const prisma = new PrismaClient();
async function createAdmin(
    role: AdminRole,
    email: string,
    firstName: string,
    lastName: string
): Promise<Prisma.AdminCreateInput> {

    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await bcrypt.hashSync("Admin@12345678"),
        role: role
    };
}
export async function createAdmins(
){
    admins.push(
        await createAdmin(AdminRole.SUPERADMIN, "developer.eww@gmail.com", "developer", "eww")
    );
    admins.push(
        await createAdmin(AdminRole.ADMIN, "fizaeww@gmail.com", "Fiza", "Belim")
    );
    admins.push(
        await createAdmin(AdminRole.ADMIN, "praveenkumar@gmail.com", "Praveen", "Kumar")
    );
    //   admins.push(
    //     await createAdmin(AdminRole.ADMIN, "heikiu.luk@aigniter.com", "heikiu", "luk")
    //   )
    await prisma.admin.createMany({
        data: admins
    })
}

createAdmins()
    .then(async () => {
        console.log("seeding completed");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log("seeding failed");
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });