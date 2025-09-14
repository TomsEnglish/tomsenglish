import LocalizedFAQ from "@/components/faq/localized";
import { ClassCards } from "@/components/classCards";
import Banner from "@/components/banner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <Banner
        title="Achieve your English goals"
        subtitle="If you're a student or a professional, I can help you advance"
        button={
          <Button asChild variant="yellow" className="w-fit">
            <Link href="/contact">Contact me</Link>
          </Button>
        }
      />

      <ClassCards />
      <LocalizedFAQ />
    </>
  );
}
