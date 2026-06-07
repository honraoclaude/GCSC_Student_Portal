import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const OnboardingSchema = z.object({
  displayName: z.string().min(1),
  yearGroup: z.enum(["YEAR_9", "YEAR_10", "YEAR_11"]),
  subjects: z.array(
    z.object({
      subject: z.string(),
      targetGrade: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    if (!body.displayName || !body.yearGroup || !body.subjects) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: body.userId },
      include: { studentProfile: true },
    });

    if (!user?.studentProfile) {
      return new Response(JSON.stringify({ error: "Student profile not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    const profileId = user.studentProfile.id;

    await prisma.studentProfile.update({
      where: { id: profileId },
      data: {
        displayName: body.displayName,
        yearGroup: body.yearGroup,
        consentGiven: true,
        consentDate: new Date(),
      },
    });

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

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
