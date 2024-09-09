import getDbConnection from "@/lib/db";

export default async function Page() {
    const sql = await getDbConnection()
    const response = await sql`SELECT version()`
    return (
        <div>Dashboard {response[0].version}</div>
    );
}