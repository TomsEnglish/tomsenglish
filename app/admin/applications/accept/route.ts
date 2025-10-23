import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { id } = await req.json();

  // Get applicant info
  const { data: applicant, error: fetchError } = await supabase
    .from("applications")
    .select("first_name, email")
    .eq("id", id)
    .single();

  if (fetchError || !applicant) {
    return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
  }

  // Update status
  const { error: updateError } = await supabase
    .from("applications")
    .update({ status: "accepted" })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  // Send acceptance email
  const { first_name, email } = applicant;
  const meetingLink = `https://toms-english.neetocal.com/english-interview?name=${first_name}&email=${email}`;

  try {
    await resend.emails.send({
      from: "Tom's English <noreply@updates.tomsenglish.com>",
      to: email,
      subject: "English class interview with Tom",
      html: `
        <p>Hi ${first_name},</p>
        <p>Thanks for registering for the English class on my website.</p>
        <p>I would like to have a short, 15-minute meeting with you to talk about your goals and to see if my classes would be the right fit for you.</p>
        <p>Please use the link below to schedule your first meeting with me:</p>
        <p><a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
        <p>Looking forward to meeting you soon,</p>
        <p>Tom</p>
      `,
    });
  } catch (err) {
    console.error("Resend error:", err);
  }

  return NextResponse.json({ success: true });
}
