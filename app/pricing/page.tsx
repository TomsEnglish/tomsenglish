import { PageTitle } from "@/components/page-title";

export default function Pricing() {
  return (
    <>
      <PageTitle title="Pricing" />

      <section id="pricing" className="pricing section">
        <div
          className="container pricing-toggle-container"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-once="true"
        >
          <div className="row gy-4 justify-content-center">
            <Card
              category="Silver"
              price="19.000"
              description="Choose how many hours"
              delay={100}
            />
            <Card
              category="Gold"
              price="17.000"
              description="10 hours per month."
              popular={true}
              delay={200}
            />
            <Card
              category="Platinum"
              price="16.000"
              description="20 hours per month"
              delay={300}
            />
            <span style={{ textAlign: "center" }}>
              The Gold and Platinum plans should be used within the month*
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

const Card = ({ category, price, description, popular, delay }: any) => {
  return (
    <div
      className="col-lg-3 col-md-6"
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-once="true"
    >
      <div className={`pricing-item ${popular && "popular"}`}>
        {popular && <div className="popular-badge">Most Popular</div>}
        <div className="pricing-header">
          <h6 className="pricing-category">{category}</h6>
          <div className="price-wrap">
            <div className="price monthly">
              <sup>$</sup>
              {price}
              <span>/hour</span>
            </div>
          </div>
          <p className="pricing-description">{description}</p>
        </div>

        <div className="pricing-cta">
          <a href="#" className="btn btn-primary w-100">
            Contact
          </a>
        </div>

        <div className="pricing-features">
          {/* <h6>Basic Plan Includes:</h6> */}
          <ul className="feature-list">
            <li>
              <i className="bi bi-check"></i> Classes online
            </li>
            <li>
              <i className="bi bi-check"></i> Flexibile schedule
            </li>
            <li>
              <i className="bi bi-check"></i> 60 minutes per class
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
