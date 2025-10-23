import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { first_name, last_name, email, level, message } = await req.json();

  // Insert into Supabase
  const { error } = await supabase
    .from("applications")
    .insert([{ first_name, last_name, email, level, message }]);

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Send email
  try {
    await resend.emails.send({
      from: "Tom's English <noreply@updates.tomsenglish.com>",
      to: "tom@tomsenglish.com",
      subject: "New Student Application",
      html: `
        <h3>New Application</h3>
        <p><strong>First name:</strong> ${first_name}</p>
        <p><strong>Last name:</strong> ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Level:</strong> ${level}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });
  } catch (err) {
    console.error("Resend email error:", err);
  }

  return NextResponse.json({ success: true });
}
