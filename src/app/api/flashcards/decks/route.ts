import { auth } from "@clerk/nextjs/server";
import { getUserWithProfile, getUserFlashcardDecks } from "@/lib/db";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await getUserWithProfile(userId);

    if (!user?.studentProfile) {
      return new Response(JSON.stringify({ error: "Student profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decks = await getUserFlashcardDecks(user.studentProfile.id);

    const formattedDecks = decks.map((deck) => ({
      id: deck.id,
      title: deck.title,
      subject: deck.subject,
      cardCount: deck._count?.cards || 0,
      createdAt: deck.createdAt,
    }));

    return new Response(JSON.stringify({ decks: formattedDecks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch decks error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

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
    const { title, subject, description } = body;

    if (!title || !subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title, subject" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await getUserWithProfile(userId);

    if (!user?.studentProfile) {
      return new Response(JSON.stringify({ error: "Student profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deck = await prisma.flashcardDeck.create({
      data: {
        title,
        subject,
        description: description || null,
        studentProfileId: user.studentProfile.id,
      },
    });

    return new Response(JSON.stringify({ deck }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Create deck error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
