import { auth } from "@clerk/nextjs/server";
import { calculateSM2 } from "@/lib/flashcards/sm2";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { cardId, quality } = body;

    if (!cardId || quality === undefined || quality < 0 || quality > 5) {
      return new Response(
        JSON.stringify({
          error: "Missing or invalid fields: cardId, quality (0-5)",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { prisma } = await import("@/lib/db/prisma");

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { studentProfile: true },
    });

    if (!user?.studentProfile) {
      return new Response(JSON.stringify({ error: "Student profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find or create progress entry
    let progress = await prisma.flashcardProgress.findUnique({
      where: {
        studentProfileId_flashcardId: {
          studentProfileId: user.studentProfile.id,
          flashcardId: cardId,
        },
      },
    });

    const sm2Update = calculateSM2(
      progress || {
        interval: 0,
        repetitions: 0,
        efactor: 2.5,
      },
      quality
    );

    if (!progress) {
      progress = await prisma.flashcardProgress.create({
        data: {
          studentProfileId: user.studentProfile.id,
          flashcardId: cardId,
          interval: sm2Update.interval,
          repetitions: sm2Update.repetitions,
          efactor: sm2Update.efactor,
          nextReviewAt: sm2Update.nextReviewAt,
        },
      });
    } else {
      progress = await prisma.flashcardProgress.update({
        where: {
          studentProfileId_flashcardId: {
            studentProfileId: user.studentProfile.id,
            flashcardId: cardId,
          },
        },
        data: {
          interval: sm2Update.interval,
          repetitions: sm2Update.repetitions,
          efactor: sm2Update.efactor,
          nextReviewAt: sm2Update.nextReviewAt,
        },
      });
    }

    return new Response(JSON.stringify({ progress }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Review card error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
