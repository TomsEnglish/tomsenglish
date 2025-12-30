import Link from "next/link";

type Skill = {
  icon: string;
  heading: string;
  detail: string;
};

type CourseTemplateProps = {
  title: string;
  subtitle: string;
  description: string[];
  skillsTitle: string;
  skills: Skill[];
  howItWorks: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function CourseTemplate({
  title,
  subtitle,
  description,
  skillsTitle,
  skills,
  howItWorks,
  ctaLabel = "Book a free call",
  ctaHref = "/contact",
}: CourseTemplateProps) {
  return (
    <section id="course-details" className="course-details section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="col-lg-8 lg:pr-10!">
          <div className="course-hero" data-aos="fade-up" data-aos-delay="200">
            <div className="hero-content">
              <h1>{title}</h1>
              <p className="course-subtitle">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 lg:pr-10!">
            <div className="overview-section">
              <h3>Course Description</h3>
              {description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="skills-grid">
              <h3>{skillsTitle}</h3>
              <div className="col">
                {skills.map((skill) => (
                  <SkillItem key={skill.heading} {...skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="requirements-section">
              <h3>How the classes work</h3>
              <ul className="requirements-list">
                {howItWorks.map((item, i) => (
                  <li key={i}>
                    <i className="bi bi-check2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link href={ctaHref} className="btn btn-primary w-100 w-max! px-4">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type SkillItemProps = {
  icon: string;
  heading: string;
  detail: string;
};

export const SkillItem = ({ icon, heading, detail }: SkillItemProps) => {
  return (
    <div className="skill-item">
      <div className="skill-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="skill-content">
        <h5>{heading}</h5>
        <p>{detail}</p>
      </div>
    </div>
  );
};
