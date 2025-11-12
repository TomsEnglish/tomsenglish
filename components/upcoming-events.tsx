import Link from "next/link";

export const UpcomingEvents = () => {
  return (
    <section id="upcoming-events" className="section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Upcoming Events</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
        <section id="contact" className="contact section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="contact-content">
              <div
                className="contact-cards-container"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <EventCard
                  day={18}
                  month="Dec"
                  title="English Speaking Workshop"
                  time="7:00 PM UTC-3"
                />
                <EventCard
                  day={18}
                  month="Dec"
                  title="English Speaking Workshop"
                  time="7:00 PM UTC-3"
                />
                <EventCard
                  day={18}
                  month="Dec"
                  title="English Speaking Workshop"
                  time="7:00 PM UTC-3"
                />
                <EventCard
                  day={18}
                  month="Dec"
                  title="English Speaking Workshop"
                  time="7:00 PM UTC-3"
                />
              </div>
            </div>
            <Link href="courses.html" className="btn-more">
              View All Events
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

const EventCard = ({ day, month, title, time }: any) => {
  return (
    <Link href="" className="contact-card">
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
