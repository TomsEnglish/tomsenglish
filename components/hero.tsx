"use client";

import Link from "next/link";

const COURSES = [
  {
    title: "General English",
    icon: "bi-chat-text",
    delay: 300,
  },
  {
    title: "Business English",
    icon: "bi-briefcase",
    delay: 400,
  },
  {
    title: "International Exam Prep",
    icon: "bi-pencil-square",
    delay: 500,
  },
];

export const Hero = () => {
  return (
    <section

      className="courses-hero section light-background"
    >
      <div className="container">
        <div className="flex row align-items-center pointer-events-auto">
          {/* Text */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="hero-text">
              <h1>Speak English with confidence</h1>
              <p>
                Online English classes with a native, TEFL-certified teacher
                from the United States.
              </p>

              <div className="hero-buttons z-20">
                <Link href="/contact" className="btn btn-primary">
                  Book a free consultation
                </Link>
              </div>

              {/* <span>6+ years teaching English online</span> */}
            </div>
          </div>

          {/* Image + floating cards */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="hero-image">
              <img
                src="/hero.jpg"
                alt="Online English classes"
                className="img-fluid main-image"
              />

              <div className="floating-cards">
                {COURSES.map(({ title, icon, delay }) => (
                  <div
                    key={title}
                    className="course-card"
                    data-aos="fade-up"
                    data-aos-delay={delay}
                  >
                    <div className="card-icon">
                      <i className={`bi ${icon}`} />
                    </div>
                    <div className="card-content">
                      <h6>{title}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
