import { CourseTemplate } from "@/components/course-template-page";

export default function InternationalExamPrep() {
  return (
    <CourseTemplate
      title="English for International Exams"
      subtitle="Personalized exam-focused classes to help you reach your target score with confidence and clarity."
      description={[
        "Our exam-focused English classes are designed around the specific international exam you are preparing for and the score you need. Lessons focus on exam structure, strategies, and the language skills required to perform well under real test conditions.",
        "Classes are structured, practical, and personalized. We work on your weakest areas while reinforcing your strengths, helping you improve accuracy, timing, and confidence across all sections of the exam.",
      ]}
      skillsTitle="Common Areas of Focus"
      skills={[
        {
          icon: "bi-clipboard-check-fill",
          heading: "Exam Strategy & Structure",
          detail:
            "Understanding question types, timing, and scoring criteria.",
        },
        {
          icon: "bi-chat-square-text-fill",
          heading: "Speaking & Writing for Exams",
          detail:
            "Targeted practice with detailed feedback aligned to exam rubrics.",
        },
        {
          icon: "bi-headphones",
          heading: "Listening & Reading Skills",
          detail:
            "Techniques to improve comprehension and accuracy.",
        },
      ]}
      howItWorks={[
        "One-on-one online exam preparation",
        "Focused on your specific exam and target score",
        "Practice with real exam-style tasks and timing",
        "Detailed feedback and score-oriented guidance",
      ]}
    />
  );
}
