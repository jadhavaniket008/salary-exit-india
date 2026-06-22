import { NextResponse } from "next/server";

// Brevo (formerly Sendinblue) free tier: 300 emails/day, unlimited contacts.
// Docs: https://developers.brevo.com/reference/createcontact
// Set BREVO_API_KEY and BREVO_LIST_ID in Vercel environment variables (NOT prefixed with NEXT_PUBLIC).

const BREVO_API = "https://api.brevo.com/v3/contacts";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = process.env.BREVO_LIST_ID?.trim();

  if (!apiKey || !listId) {
    return NextResponse.json({ error: "Newsletter not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body
    ? (body as { email: unknown }).email
    : undefined;

  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const res = await fetch(BREVO_API, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [Number(listId)],
      updateEnabled: true,
    }),
  });

  // 201 = created, 204 = already exists (both fine)
  if (res.status === 201 || res.status === 204) {
    return NextResponse.json({ ok: true });
  }

  const err = await res.json().catch(() => ({})) as { message?: string };
  return NextResponse.json(
    { error: err.message ?? "Could not subscribe. Try again." },
    { status: 400 }
  );
}
