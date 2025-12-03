// app/api/applications/[id]/action/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

  const { action } = await req.json();
  

  const { data: applicant, error: fetchError } = await (await supabase)
    .from("applications")
   .select("first_name, email")
    .eq("id", params.id)
    .single();

  if (fetchError || !applicant) {
    return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
  }

  const { first_name, email } = applicant;

  let newStatus = "";
  let emailSubject = "";
  let emailBody = "";

  switch (action) {
    case "trial_accepted":
      newStatus = "trial_accepted";
      emailSubject = "Trial Lesson Invitation — Tom's English";
      emailBody = `<p>Hi ${first_name},</p>
        <p>I’d like to invite you to a free trial lesson so we can discuss your goals and see if we're a good fit.</p>
        <p>Please schedule your meeting here: <a href="YOUR_SCHEDULING_LINK">Book Trial</a></p>
        <p>Best,<br>Tom</p>`;
      break;

    case "trial_rejected":
      newStatus = "trial_rejected";
      emailSubject = "Your Application to Tom's English";
      emailBody = `<p>Hi ${first_name},</p>
        <p>Thank you for applying to Tom's English. Unfortunately, we're not able to proceed with a trial lesson at this time.</p>
        <p>Best wishes,<br>Tom</p>`;
      break;

    case "student_accepted":
      newStatus = "student_accepted";
      emailSubject = "Welcome to Tom's English!";
      emailBody = `<p>Hi ${first_name},</p>
        <p>It was great having you in the trial lesson! I'm excited to welcome you as a full student at Tom's English.</p>
        <p>I'll send you more details soon about our class schedule and payment.</p>
        <p>Best,<br>Tom</p>`;
      break;

    case "student_rejected":
      newStatus = "student_rejected";
      emailSubject = "About Your Trial Lesson";
      emailBody = `<p>Hi ${first_name},</p>
        <p>Thank you for taking the time to attend a trial lesson. Unfortunately, I've decided not to proceed with full classes at this time.</p>
        <p>Wishing you the best on your English learning journey,<br>Tom</p>`;
      break;
  }

  const result = await resend.emails.send({
    from: "Tom's English <noreply@updates.tomsenglish.com>",
    to: email,
    subject: emailSubject,
    html: emailBody,
  });

  if (result.error) {
    console.error("Resend error:", result.error);
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
