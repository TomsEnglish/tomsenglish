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

  const { data: applicant, error: fetchError } = await supabase
    .from("applications")
    .select("first_name, email")
    .eq("id", id)
    .single();

  if (fetchError || !applicant) {
    return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("applications")
    .update({ status: "rejected" })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  const { first_name, email } = applicant;

  try {
    await resend.emails.send({
      from: "Tom's English <noreply@updates.tomsenglish.com>",
      to: email,
      subject: "Your English class registration",
      html: `
        <p>Hi ${first_name},</p>
        <p>Thank you for your interest in taking classes with me.</p>
        <p>Unfortunately, I'm not able to accept new students at the moment.</p>
        <p>Best wishes,</p>
        <p><b>Tom Frame</b><br/>
        Tom's English<br/>
        <a href="mailto:tom@tomsenglish.com">tom@tomsenglish.com</a><br/>
        </p>
      `,
    });
  } catch (err) {
    console.error("Resend error:", err);
  }

  return NextResponse.json({ success: true });
}
