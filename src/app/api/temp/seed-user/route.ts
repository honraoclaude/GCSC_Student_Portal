export async function POST(req: Request) {
  try {
    const { clerkId, email } = await req.json();

    const { prisma } = await import("@/lib/db/prisma");

    const user = await prisma.user.create({
      data: {
        clerkId,
        email: email || `${clerkId}@test.com`,
        role: "STUDENT",
        studentProfile: {
          create: {
            displayName: "Test Student",
            yearGroup: "YEAR_11",
            consentGiven: false,
          },
        },
      },
      include: { studentProfile: true },
    });

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
