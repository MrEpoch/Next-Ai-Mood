import { getDbUser } from "@/utils/auth";
import { prisma } from "@/utils/db"

const getEntries = async () => {
    const user = await getDbUser();

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return entries;
}

export default async function Journal() {
    const entries = await getEntries();

    return (
        <div className="">
            Journal
        </div>
    )
}
