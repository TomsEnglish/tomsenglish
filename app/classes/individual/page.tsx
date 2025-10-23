"use client";

import ClassForm from "./form";
import { ClassCards } from "@/components/classCards";
import { ClassDetailCard } from "@/components/classDetailCard";
import LocalizedFAQ from "@/components/faq/localized";
import { Button } from "@/components/ui/button";
import { Brush, ThumbsUp, CalendarRange, Laptop, Book } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function IndividualClass() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="container-fluid gap-4 flex flex-col">
        <h2>Individual Classes</h2>
        <div className="flex flex-col gap-4! w-full sm:max-w-full md:max-w-2xl lg:max-w-3xl self-center">
          <p>
            I offer individual (1-on-1) classes for adults of all levels, from
            beginners to advanced. My classes are 100% customized to your goals:
            whether it's job specific, improving your fluency through
            conversation practice, preparing for an exam, preparing for
            interviews, or improving your vocabulary specific to your field
            (business, law, medicine, etc.).
          </p>
          <p>
            <b>Price: </b>$20 USD per hour
          </p>

          <DetailCards />

          {!show ? (
            <Button
              variant="yellow"
              className="w-fit cursor-pointer"
              onClick={() => setShow(true)}
            >
              <Link href="#register">Register today</Link>
            </Button>
          ) : (
            <div id="register">
              <ClassForm />
            </div>
          )}
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
