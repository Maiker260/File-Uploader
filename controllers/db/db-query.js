import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRegularUserOnDB(userdata) {
    try {
        const user = await prisma.user.create({
            data: userdata,
        });

        return user;
    } catch (err) {
        console.error("Error creating User: ", err);
    } finally {
        await prisma.$disconnect();
    }
}

export async function findUserOnDB({ username, email, id }) {
    try {
        const whereClause = {};
        if (username) whereClause.username = username;
        if (email) whereClause.email = email;
        if (id) whereClause.id = id;

        return await prisma.user.findFirst({ where: whereClause });
    } catch (err) {
        console.error("Error querying the DB: ", err);
    } finally {
        await prisma.$disconnect();
    }
}

export async function createNewFolderOnDB(name, user) {
    try {
        const newFolder = await prisma.folder.create({
            data: {
                name,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        return newFolder;
    } catch (err) {
        console.error("Error creating the Folder: ", err);
    } finally {
        await prisma.$disconnect();
    }
}

export async function checkUserData(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                folders: {
                    include: {
                        children: true,
                        files: true,
                    },
                },
            },
        });

        return user;
    } catch (err) {
        console.log("Error finding the user:", err);
    } finally {
        await prisma.$disconnect();
    }
}
