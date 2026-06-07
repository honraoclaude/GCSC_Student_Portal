import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const GCSE_SUBJECTS = [
  "MATHS",
  "ENGLISH_LANGUAGE",
  "ENGLISH_LITERATURE",
  "PHYSICS",
  "CHEMISTRY",
  "BIOLOGY",
  "COMPUTER_SCIENCE",
  "ECONOMICS",
  "BUSINESS",
  "GEOGRAPHY",
  "HISTORY",
] as const;

const GRADES = [
  "GRADE_1",
  "GRADE_2",
  "GRADE_3",
  "GRADE_4",
  "GRADE_5",
  "GRADE_6",
  "GRADE_7",
  "GRADE_8",
  "GRADE_9",
] as const;

const OnboardingSchema = z.object({
  displayName: z.string().min(1),
  yearGroup: z.enum(["YEAR_9", "YEAR_10", "YEAR_11"]),
  subjects: z.array(
    z.object({
      subject: z.enum(GCSE_SUBJECTS),
      targetGrade: z.enum(GRADES),
    })
  ),
});

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const data = OnboardingSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
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
            subject: subject.subject,
            targetGrade: subject.targetGrade,
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
