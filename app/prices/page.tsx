"use client";

import Link from "next/link";
import { PageTitle } from "@/components/page-title";

const PRICES_USD = {
  general: 10,
  business: 15,
  exam: 20,
};

export default function Prices() {
  return (
    <>
      <PageTitle />

      <section id="pricing" className="pricing section">
        <div
          className="container pricing-toggle-container"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-once="true"
        >
          {/* Cards */}
          <div className="pricing-row">
            <Card
              category="General English"
              description="Everyday English, grammar, and vocabulary."
              price={PRICES_USD.general}
              delay={100}
            />
            <Card
              category="Business English"
              description="Corporate vocabulary, emails, and interview prep."
              price={PRICES_USD.business}
              popular
              delay={200}
            />
            <Card
              category="Exam Prep"
              description="Intensive IELTS/TOEFL coaching and mock exams."
              price={PRICES_USD.exam}
              delay={300}
            />
          </div>
        </div>
      </section>
    </>
  );
}

type CardProps = {
  category: string;
  description: string;
  price: number;
  popular?: boolean;
  delay?: number;
};

const Card = ({ category, description, price, popular, delay }: CardProps) => {
  return (
    <div
      className="w-fit"
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-once="true"
    >
      <div className={`pricing-item ${popular ? "popular" : ""}`}>
        {popular && <div className="popular-badge">Most Popular</div>}

        <div className="pricing-header">
          <h6 className="pricing-category">{category}</h6>

          <div className="price-wrap">
            <div className="price">
              <span className="amount">${price} USD</span>
              <span className="unit">/hour</span>
            </div>
          </div>

          <p className="pricing-description">{description}</p>
        </div>

        <div className="pricing-cta">
          <Link href="/contact" className="btn btn-primary w-100">
            Book a free call
          </Link>
        </div>

        <div className="pricing-features">
          <ul className="feature-list">
            <li>
              <i className="bi bi-check"></i> Classes online
            </li>
            <li>
              <i className="bi bi-check"></i> Flexible schedule
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
