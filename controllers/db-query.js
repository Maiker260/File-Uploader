import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRegularUser(userdata) {
    try {
        const user = await prisma.user.create({
            data: userdata,
        });

        return user;
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;
    }
}
