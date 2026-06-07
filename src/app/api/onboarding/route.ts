import { getUserWithProfile } from "@/lib/db";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await getUserWithProfile(body.userId);

    if (!user?.studentProfile) {
      return new Response(JSON.stringify({ error: "Student profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const profileId = user.studentProfile!.id;

    await prisma.studentProfile.update({
      where: { id: profileId },
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
              studentProfileId: profileId,
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
