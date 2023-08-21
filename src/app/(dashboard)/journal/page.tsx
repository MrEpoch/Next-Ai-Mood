import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getDbUser } from "@/utils/auth";
import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client";
import Link from "next/link";
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

    return (
        <div className="bg-zinc-400/10 h-full p-10">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="grid grid-cols-3 gap-4 p-10">
            <NewEntryCard />
                {entries.map((entry, i) => (
                    <Link key={entry.id} href={`/journal/${entry.id}`}>
                        <EntryCard entry={entry} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
