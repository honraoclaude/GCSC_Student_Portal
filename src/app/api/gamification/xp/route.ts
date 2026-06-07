import { auth } from "@clerk/nextjs/server";
import { awardXP } from "@/lib/gamification/xp-events";
import { checkAndAwardAchievements } from "@/lib/gamification/achievements";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { eventType, metadata } = await req.json();

    if (!eventType) {
      return new Response(
        JSON.stringify({ error: "Missing eventType" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const xpResult = await awardXP(userId, eventType, metadata);
    const newAchievements = await checkAndAwardAchievements(userId);

    return new Response(
      JSON.stringify({
        xp: xpResult.xp,
        newLevel: xpResult.newLevel,
        leveledUp: xpResult.leveledUp,
        newTotal: xpResult.newTotal,
        newAchievements,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("XP award error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
