import { CourseTemplate } from "@/components/course-template-page";
import { PageTitle } from "@/components/page-title";

export default function BusinessEnglish() {
  return (
    <>
    <PageTitle />
   
    <CourseTemplate
      title="Business English for Professionals"
      subtitle="Personalized English classes to help you communicate clearly and confidently in professional and international environments."
      description={[
        "Our Business English classes are built around your real work and real goals. We focus on meetings, interviews, presentations, emails, negotiations, and professional conversations.",
        "Classes are practical, conversational, and personalized. Lessons adapt to your job role, industry, and level as your needs evolve.",
      ]}
      skillsTitle="Common Areas of Focus"
      skills={[
        {
          icon: "bi-people-fill",
          heading: "Communication for Work",
          detail: "Meetings, calls, interviews, and written communication.",
        },
        {
          icon: "bi-briefcase-fill",
          heading: "Career & Interview Preparation",
          detail: "Interview practice, promotions, and role changes.",
        },
        {
          icon: "bi-flask-fill",
          heading: "Industry-Specific English",
          detail: "Vocabulary and situations related to your field.",
        },
      ]}
      howItWorks={[
        "One-on-one online classes",
        "Focused on your real professional situations",
        "Flexible schedule",
        "Continuous feedback and correction",
      ]}
    />
     </>
  );
}
