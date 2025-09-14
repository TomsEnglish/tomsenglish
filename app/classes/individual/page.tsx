import { ClassCards } from "@/components/classCards";
import { ClassDetailCard } from "@/components/classDetailCard";
import LocalizedFAQ from "@/components/faq/localized";
import { Button } from "@/components/ui/button";
import { Brush, ThumbsUp, CalendarRange, Laptop, Book } from "lucide-react";
import Link from "next/link";

export default function IndividualClass() {
  return (
    <>
      <div className="container-fluid gap-4 flex flex-col">
        <h2>Individual Classes</h2>
        <div className="flex flex-col gap-4! w-full sm:max-w-full md:max-w-2xl lg:max-w-3xl self-center">
          <p>
            I offer individual classes for all levels, from beginners to
            advanced. Classes are fully tailored to your goals: whether it's
            improving your conversation skills, preparing for an exam,
            practicing job interviews, writing professional emails, or improving
            your vocabulary specific to your field (business, law, medicine,
            etc.).
          </p>
          <p>
            <b>Price: </b>$20 USD per hour
          </p>

          <DetailCards />

          <Button asChild variant="yellow" className="w-fit">
            <Link href="/contact">Contact me</Link>
          </Button>
        </div>
      </div>
      {/* <ClassCards title={["2"]} types={["unt", "grupales"]} /> */}
      <LocalizedFAQ />
    </>
  );
}

const DetailCards = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 w-full">
      <ClassDetailCard icon={<Brush size={30} />} text={`100% personalized`} />
      <ClassDetailCard
        icon={<ThumbsUp size={30} />}
        text={`Free consultation`}
      />
      <ClassDetailCard
        icon={<CalendarRange size={30} />}
        text={`Flexible schedule`}
      />
      <ClassDetailCard icon={<Laptop size={30} />} text={`100% online`} />
      <ClassDetailCard icon={<Book size={30} />} text={`Materials included`} />
    </div>
  );
};
