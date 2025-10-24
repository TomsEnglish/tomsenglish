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

  // Send email
  try {
    const result = await resend.emails.send({
      from: "Tom's English <noreply@updates.tomsenglish.com>",
      to: email,
      subject: "English class interview with Tom",
      html: `
        <p>Hi ${first_name},</p>
        <p>Thank you for taking the time to register for classes. I would like to have a short, 15-minute meeting with you to talk about your goals and to see if my classes would be the right fit for you.</p>
        <p>Please use the link below to schedule your first meeting with me:<br/>
        <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
        <p>Looking forward to meeting you soon,<p/>
        <p><b>Tom Frame</b><br/>
        Tom's English<br/>
        <a href="mailto:tom@tomsenglish.com">tom@tomsenglish.com</a><br/>
        </p>
      `,
    });
    if (result.error) {
      console.error("Resend API returned error:", result.error);
    } else {
      console.log("Email sent successfully:", result.data);
    }
  } catch (err) {
    console.error("Resend email error:", err);
  }

  return NextResponse.json({ success: true });
}
