"use client";

import CountUp from "react-countup";
import Link from "next/link";

export const Hero = () => {
  return (
    <section
      id="courses-hero"
      className="courses-hero section light-background"
    >
      <div className="hero-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="hero-text">
                <h1>Hi, I'm Tom</h1>
                <p>
                  Welcome to my page! This page is all about helping you grow
                  your English skills. Discover free resources, practical tips,
                  and personalized classes designed to make learning simple and
                  enjoyable.
                </p>

                {/* <div className="hero-stats">
                  <div className="stat-item">
                    <h3 className="number purecounter">
                      <CountUp end={1650} duration={1.5} />+
                    </h3>

                    <span className="label">Classes given</span>
                  </div>
                </div> */}

                <div className="hero-buttons">
                  <Link href="" className="btn btn-primary">
                  Browse Courses
                  </Link>

                </div>

                {/* <div className="hero-features">
                  <div className="feature">
                    <i className="bi bi-shield-check"></i>
                    <span>Certified Teacher</span>
                  </div>
                  <div className="feature">
                    <i className="bi bi-clock"></i>
                    <span>Lifetime Access</span>
                  </div>
                  <div className="feature">
                    <i className="bi bi-people"></i>
                    <span>Expert Instructors</span>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="hero-image">
                <div className="main-image">
                  <img
                    src="/education/courses-13.webp"
                    alt="Online Learning"
                    className="img-fluid"
                  />
                </div>

                <div className="floating-cards">
                  <div
                    className="course-card"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="card-icon">
                      <i className="bi bi-chat-text"></i>
                    </div>
                    <div className="card-content">
                      <h6>General English</h6>
          
                    </div>
                  </div>

                  <div
                    className="course-card"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="card-icon">
                      <i className="bi bi-briefcase"></i>
                    </div>
                    <div className="card-content">
                      <h6>Business English</h6>
             
                    </div>
                  </div>

                  <div
                    className="course-card"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <div className="card-icon">
                      <i className="bi bi-pencil-square"></i>
                    </div>
                    <div className="card-content">
                      <h6>IELTS Preparation</h6>
          
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-background">
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};
