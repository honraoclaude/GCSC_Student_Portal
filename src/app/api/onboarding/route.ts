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
    const data = OnboardingSchema.parse(body);

    // Get userId from request body (sent by client)
    if (!body.userId) {
      return new Response("Missing userId", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: body.userId },
      include: { studentProfile: true },
    });

    if (!user?.studentProfile) {
      return new Response("Student profile not found", { status: 404 });
    }

    const profileId = user.studentProfile.id;

    await prisma.studentProfile.update({
      where: { id: profileId },
      data: {
        displayName: data.displayName,
        yearGroup: data.yearGroup,
        consentGiven: true,
        consentDate: new Date(),
      },
    });

    await Promise.all(
      data.subjects.map((subject) =>
        prisma.subjectEnrollment.create({
          data: {
            studentProfileId: profileId,
            subject: subject.subject as any,
            targetGrade: subject.targetGrade as any,
          },
        })
      )
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response("Onboarding failed", { status: 500 });
  }
}
