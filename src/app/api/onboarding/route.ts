export async function POST(req: Request) {
  try {
    console.log("Onboarding route hit");
    const body = await req.json();
    console.log("Body:", body);

    if (!body.userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Onboarding error:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
