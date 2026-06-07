import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId || !body.displayName || !body.yearGroup || !body.subjects) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    console.log("Finding user:", body.userId);
    const user = await prisma.user.findUnique({
      where: { clerkId: body.userId },
      include: { studentProfile: true },
    });

    if (!user?.studentProfile) {
      console.error("Student profile not found for user:", body.userId);
      return new Response(JSON.stringify({ error: "Student profile not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    const profileId = user.studentProfile.id;
    console.log("Updating profile:", profileId);

    await prisma.studentProfile.update({
      where: { id: profileId },
      data: {
        displayName: body.displayName,
        yearGroup: body.yearGroup,
        consentGiven: true,
        consentDate: new Date(),
      },
    });

    console.log("Creating subject enrollments");
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

    console.log("Onboarding complete");
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
