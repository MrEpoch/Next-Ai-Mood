import Editor from "@/components/Editor";
import { getDbUser } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
    const user = await getDbUser({});

    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                // @ts-ignore
                userId: user?.id as string,
                id,
            }
        },
    });

    return entry;
}

export default async function Page({ params }: { params: { id: string } }) {
    const entry = await getEntry(params.id);

    return (
        <div className="h-screen w-screen bg-red">
            <Editor entry={entry} />
        </div>
    )
}
