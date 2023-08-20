import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const getDbUser = async ({ include = {} , select = {} }) => {
    const { userId } = await auth();
    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: userId as string,
        },
        include
    });
    return dbUser;
}
