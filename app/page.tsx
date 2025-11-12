import Image from "next/image";
import { Hero } from "@/components/hero";
import { UpcomingEvents } from "@/components/upcoming-events";

export default function Home() {
  return (
    <div>
      <Hero />
      <UpcomingEvents />
    </div>
  );
}
