import { prisma } from "@/utils/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const createNewUser = async () => {
    try {
        const user = await currentUser();
        const match = await prisma.user.findUnique({
            where: {
                clerkId: user?.id as string
            }
        });
        
        if (!match) {
            const user_create = await prisma.user.create({
                data: {
                    clerkId: user?.id as string,
                    email: user?.emailAddresses[0].emailAddress as string,
                }
            });
        }
    } catch (error) {
        console.log(error)
    }

    redirect("/journal");
}

export default async function NewUserPage() {
    await createNewUser();
    return (
        <div className="h-screen w-screen bg-red">
             
        </div>
    )        
}
