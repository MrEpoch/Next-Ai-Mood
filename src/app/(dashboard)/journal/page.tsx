import { getDbUser } from "@/utils/auth";
import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

const getEntries = async () => {
    const user = await getDbUser({});

    if (!user) redirect("/login");

    const entries = await prisma.journalEntry.findMany({
        where: {
            // @ts-ignore
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return entries;
}

export default async function Journal() {
    const entries = await getEntries();
    console.log(entries);

    return (
        <div className="">
            Journal
        </div>
    )
}
