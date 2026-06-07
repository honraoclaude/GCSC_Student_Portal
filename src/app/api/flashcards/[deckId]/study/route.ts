import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
) {
  const { deckId } = await params;
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
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

    const deck = await prisma.flashcardDeck.findUnique({
      where: { id: deckId },
      include: { cards: true },
    });

    if (!deck || deck.studentProfileId !== user.studentProfile.id) {
      return new Response(JSON.stringify({ error: "Deck not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get cards that need review (nextReviewAt <= today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextCard = await prisma.flashcard.findFirst({
      where: {
        deckId: deckId,
        progress: {
          some: {
            studentProfileId: user.studentProfile.id,
            nextReviewAt: {
              lte: today,
            },
          },
        },
      },
      include: {
        progress: {
          where: { studentProfileId: user.studentProfile.id },
        },
      },
    });

    // If no card needs review, get first card (new)
    const cardToReview = nextCard || deck.cards[0];

    if (!cardToReview) {
      return new Response(JSON.stringify({ card: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        card: {
          id: cardToReview.id,
          front: cardToReview.front,
          back: cardToReview.back,
          hint: cardToReview.hint,
          progress: "progress" in cardToReview ? (cardToReview.progress as any)[0] || null : null,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Get next card error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
