"use client";

// import ClassForm from "./form";
import ClassForm2 from "./form2";
import { ClassCards } from "@/components/classCards";
import { ClassDetailCard } from "@/components/classDetailCard";
import LocalizedFAQ from "@/components/faq/localized";
import { Button } from "@/components/ui/button";
import {
  Brush,
  ThumbsUp,
  CalendarRange,
  Laptop,
  BookCheck,
  Book,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function IndividualClass() {
  return (
    <>
      <div className="container-fluid gap-4 flex flex-col">
        <h2>Individual Classes</h2>
        <div className="flex flex-col gap-4! w-full sm:max-w-full md:max-w-2xl lg:max-w-3xl self-center">
          <p>
            1-on-1 classes for adults of all levels, from
            beginners to advanced. Whether you're looking to study English for
            work, improve your fluency through conversation practice, prepare
            for an exam, prepare for interviews, or improve your vocabulary
            specific to your field (business, law, medicine, etc.), my classes
            are customized to help you reach your goals.
          </p>
          <p>
            <b className="text-xl">$ 20 USD </b>per hour
          </p>

          <DetailCards />
          <ClassForm2 />
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
      {/* <ClassDetailCard icon={<Brush size={30} />} text={`Personalized classes`} /> */}
      <ClassDetailCard
        icon={<ThumbsUp size={30} />}
        text={`Free consultation`}
      />
      <ClassDetailCard
        icon={<CalendarRange size={30} />}
        text={`Flexible schedule`}
      />
      <ClassDetailCard icon={<Laptop size={30} />} text={`100% online`} />
      <ClassDetailCard
        icon={<BookCheck size={30} />}
        text={`Materials included`}
      />
    </div>
  );
};
