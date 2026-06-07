import { auth } from "@clerk/nextjs/server";

export async function POST(
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

    const body = await req.json();
    const { front, back, hint } = body;

    if (!front || !back) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: front, back" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { prisma } = await import("@/lib/db/prisma");

    // Verify user owns this deck
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id: params.deckId },
      include: { studentProfile: true },
    });

    if (!deck) {
      return new Response(JSON.stringify({ error: "Deck not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { studentProfile: true },
    });

    if (deck.studentProfileId !== user?.studentProfile?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const card = await prisma.flashcard.create({
      data: {
        deckId: params.deckId,
        front,
        back,
        hint: hint || null,
      },
    });

    return new Response(JSON.stringify({ card }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Add card error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

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
      where: { id: params.deckId },
      include: { cards: true },
    });

    if (!deck || deck.studentProfileId !== user.studentProfile.id) {
      return new Response(JSON.stringify({ error: "Deck not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ cards: deck.cards }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Get cards error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
