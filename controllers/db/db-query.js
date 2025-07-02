import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRegularUser(userdata) {
    try {
        const user = await prisma.user.create({
            data: userdata,
        });

        return user;
    } catch (err) {
        console.error("Error creating user: ", err);
    }
}

export async function findUser({ username, email }) {
    try {
        const whereClause = {};
        if (username) whereClause.username = username;
        if (email) whereClause.email = email;

        return await prisma.user.findFirst({ where: whereClause });
    } catch (err) {
        console.error("Error querying the DB: ", err);
    }
}
