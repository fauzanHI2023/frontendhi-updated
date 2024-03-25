import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function page() {
    const session = await getServerSession(authOptions);
    console.log(session)

    return (
        <div>
            {session.user.user_name}
        </div>
    )
}