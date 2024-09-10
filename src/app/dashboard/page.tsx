
import BgGradient from "@/components/bg-gradient";
import { Badge } from "@/components/ui/badge";
import UpgradeYourPlan from "@/components/upgrade-plain";
import UploadForm from "@/components/upload-form";
import getDbConnection from "@/lib/db";
import { doesUserExist, getPlanType, hasCancelledSubscription, updateUser } from "@/lib/user-helpers";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// 🧠 💡 CREO que hay que mirar el caso en que el usuario se a cancelado la suscripción

// import fetch from 'node-fetch';

// async function testOpenAIConnection() {
//   try {
//     const response = await fetch('https://api.openai.com/v1/models', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//     });
//     const data = await response.json();
//     console.log('API Test Response:', data);
//   } catch (error) {
//     console.error('Error testing OpenAI connection:', error);
//   }
// }



export default async function Dashboard() {
  const clerkUser = await currentUser();
  // testOpenAIConnection();
  if (!clerkUser) {
    return redirect("/sign-in");
  }

  const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

  const sql = await getDbConnection();

  //updatethe user id
  let userId = null;
  let priceId = null;

  const hasUserCancelled = await hasCancelledSubscription(sql, email);
  const user = await doesUserExist(sql, email);

  if (user) {
    //update the user_id in users table
    userId = clerkUser?.id;
    if (userId) {
      await updateUser(sql, userId, email);
    }

    priceId = user[0].price_id;
  }

  const { id: planTypeId = "starter", name: planTypeName } =
    getPlanType(priceId);

  const isBasicPlan = planTypeId === "basic";
  const isProPlan = planTypeId === "pro";

  // check number of posts per plan
  const posts = await sql`SELECT * FROM posts WHERE user_id = ${userId}`;

  const isValidBasicPlan = isBasicPlan && posts.length < 3;

  return (
    <BgGradient>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Badge className="bg-gradient-to-r from-purple-700 to-pink-800 text-white px-4 py-1 text-lg font-semibold capitalize">
            {planTypeName} Plan
          </Badge>

          <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start creating amazing content
          </h2>

          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            Upload your audio or video file and let our AI do the magic!
          </p>

          {(isBasicPlan || isProPlan) && (
            <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
              You get{" "}
              <span className="font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                {isBasicPlan ? "3" : "Unlimited"} blog posts
              </span>{" "}
              as part of the{" "}
              <span className="font-bold capitalize">{planTypeName}</span> Plan.
            </p>
          )}

          {isValidBasicPlan || isProPlan ? (
            <BgGradient>
              <UploadForm />
            </BgGradient>
          ) : (
            <UpgradeYourPlan />
          )}
          {/* {hasUserCancelled && <UpgradeYourPlan/>} */}
        </div>
      </div>
    </BgGradient>
  );
}