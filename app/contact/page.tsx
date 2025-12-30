import Form from "./form";
import { PageTitle } from "@/components/page-title";

const contactItems = [
  {
    icon: "bi-envelope",
    title: "Email",
    value: "tom@tomsenglish.com",
  },
  // {
  //   icon: "bi-whatsapp",
  //   title: "WhatsApp",
  //   value: "+1 (212) 555-7890",
  // },
  {
    icon: "bi-clock",
    title: "Availability",
    value: "Monday-Friday: 13:00-20:00 (Buenos Aires, UTC-3)",
  },
];

export default function Contact() {
  return (
    <>
    <PageTitle />
    
    <section id="contact" className="contact section">
      <div className="container" data-aos="fade-up">
        <div className="contact-main-wrapper">
          <div className="contact-content">
            {/* Contact cards */}
            <div
              className="contact-cards-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {contactItems.map(({ icon, title, value }) => (
                <div key={title} className="contact-card">
                  <div className="icon-box">
                    <i className={`bi ${icon}`} />
                  </div>

                  <div className="contact-text">
                    <h4>{title}</h4>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div
              className="contact-form-container"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
