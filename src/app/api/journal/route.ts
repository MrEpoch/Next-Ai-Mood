import { getDbUser } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
    const user = await getDbUser({});
    const entry = await prisma.journalEntry.create({
        data: {
            // @ts-ignore
            userId: user.id,
            content: "Write about your day here!"
        }
    });
    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
}
