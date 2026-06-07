export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { prisma } = await import("@/lib/db/prisma");

    const user = await prisma.user.findUnique({
      where: { clerkId: body.userId },
      include: { studentProfile: true },
    });

    if (!user?.studentProfile) {
      return new Response(JSON.stringify({ error: "Student profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await prisma.studentProfile.update({
      where: { id: user.studentProfile.id },
      data: {
        displayName: body.displayName,
        yearGroup: body.yearGroup,
        consentGiven: true,
        consentDate: new Date(),
      },
    });

    if (body.subjects && body.subjects.length > 0) {
      await Promise.all(
        body.subjects.map((subject: any) =>
          prisma.subjectEnrollment.create({
            data: {
              studentProfileId: user.studentProfile.id,
              subject: subject.subject,
              targetGrade: subject.targetGrade,
            },
          })
        )
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
