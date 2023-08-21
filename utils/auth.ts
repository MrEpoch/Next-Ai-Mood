import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";
import { redirect } from "next/navigation";

export const getDbUser = async ({ include, select }: { include?: any, select?: any }) => {
    const { userId } = await auth();
    if (select) {
        const dbUser = await prisma.user.findUnique({
            where: {
                clerkId: userId as string,
            },
            select,
        });
        return dbUser;
    } else if (include) {
        const dbUser = await prisma.user.findUnique({
            where: {
                clerkId: userId as string,
            },
            include,
        });
        return dbUser;
    } else {
        const dbUser = await prisma.user.findUnique({
            where: {
                clerkId: userId as string,
            },
        });
        return dbUser;
    }
}
