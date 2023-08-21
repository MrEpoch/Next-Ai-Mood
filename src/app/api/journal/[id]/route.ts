import { getDbUser } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
  
export async function PATCH (req: NextRequest, { params }: { params: any }) {
    const user = await getDbUser({});
    const { content } = await req.json();

    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                // @ts-ignore
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content
        }
    });

    return NextResponse.json({ data: updatedEntry });

};
