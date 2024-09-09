import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser()

    //update user clerk

    const email = user?.emailAddresses?.[0].emailAddress ?? ""
    const sql = await getDbConnection()
    const response = await sql`SELECT * FROM users WHERE status = 'cancelled' AND email = ${email}`
    return (
        <div>Dashboard status: {JSON.stringify(response)}</div>
    );
}