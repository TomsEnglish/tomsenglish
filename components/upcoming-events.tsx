import Link from "next/link";
import React from "react";

// 1. Define an interface for the EventCard props
interface EventCardProps {
  day: number;
  month: string;
  title: string;
  time: string;
  fadeDelay: number;
}

export const UpcomingEvents = () => {
  return (
    <section id="upcoming-events" className="section">
      <div
        className="container section-title"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <h2>Upcoming Events</h2>
        <p>
          Join our upcoming workshops and practice sessions to improve your
          English skills.
        </p>
      </div>

      <div
        className="container"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-once="true"
      >
        <div className="contact-content">
          <div
            className="contact-cards-container"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-once="true"
          >
            <EventCard
              day={18}
              month="Dec"
              title="English Speaking Workshop"
              time="7:00 PM UTC-3"
              fadeDelay={300}
            />
            <EventCard
              day={19}
              month="Dec"
              title="Grammar Essentials"
              time="6:00 PM UTC-3"
              fadeDelay={350}
            />
            <EventCard
              day={20}
              month="Dec"
              title="Business English Pro"
              time="7:00 PM UTC-3"
              fadeDelay={400}
            />
            <EventCard
              day={21}
              month="Dec"
              title="IELTS Strategy Session"
              time="7:00 PM UTC-3"
              fadeDelay={450}
            />
          </div>
        </div>
        <Link
          href="/events" // Updated from courses.html to a Next.js route
          className="btn-more"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-once="true"
        >
          View All Events
        </Link>
      </div>
    </section>
  );
};

// 2. Apply the interface to the component
const EventCard = ({ day, month, title, time, fadeDelay }: EventCardProps) => {
  return (
    <Link
      href="#"
      className="contact-card"
      data-aos="fade-up"
      data-aos-delay={fadeDelay}
      data-aos-once="true"
    >
      <div className="upcoming-list">
        <div className="upcoming-item">
          <div className="upcoming-date">
            <span className="day">{day}</span>
            <span className="month">{month}</span>
          </div>
        </div>
      </div>

      <div className="contact-text">
        <h4>{title}</h4>
        <div className="upcoming-meta">
          <span className="time">
            <i className="bi bi-clock"></i> {time}
          </span>
        </div>
      </div>
    </Link>
  );
};