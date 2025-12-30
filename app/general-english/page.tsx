import { CourseTemplate } from "@/components/course-template-page";

export default function GeneralEnglish() {
  return (
    <CourseTemplate
      title="English for Everyday Communication"
      subtitle="Personalized English classes to help you speak more fluently, confidently, and naturally."
      description={[
        "Our General English classes are designed around your real life, your goals, and your current level. Whether you want to improve your grammar, expand your vocabulary, or feel more comfortable speaking, lessons are adapted to what you actually need.",
        "Classes are practical, conversational, and flexible. We work across levels from A2 to C1, adjusting the focus as you progress, whether that means building a strong foundation or refining advanced language skills.",
      ]}
      skillsTitle="Common Areas of Focus"
      skills={[
        {
          icon: "bi-chat-dots-fill",
          heading: "Speaking & Fluency",
          detail:
            "Conversation practice to help you speak more naturally.",
        },
        {
          icon: "bi-file-text-fill",
          heading: "Grammar & Structure",
          detail:
            "Clear explanations and guided practice.",
        },
        {
          icon: "bi-globe-americas-fill",
          heading: "Everyday & Real-Life English",
          detail:
            "Useful vocabulary and situations for daily life and travel.",
        },
      ]}
      howItWorks={[
        "One-on-one online classes",
        "Adapted to your level and personal goals (A2-C1)",
        "Flexible focus on grammar, speaking, or conversation",
        "Continuous feedback and correction",
      ]}
    />
  );
}
