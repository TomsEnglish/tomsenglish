import { Hero } from "./hero";
import { UpcomingEvents } from "./upcoming-events";
import { Testimonials } from "./testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <UpcomingEvents />
      <Testimonials />
    </div>
  );
}
