"use client";

import { useState } from "react";
import Link from "next/link";
import { usePricingCurrency } from "@/hooks/usePricingCurrency";
import { PageTitle } from "@/components/page-title";

type BillingType = "hourly" | "bulk";

const PRICES_USD = {
  general: 12,
  business: 15,
  exam: 17,
};

const DISCOUNT_RATE = 0.2;

const applyDiscount = (price: number) =>
  Math.round(price * (1 - DISCOUNT_RATE));

export default function Prices() {
  const [billingType, setBillingType] = useState<BillingType>("hourly");

  const { priceFromUSD, currency, ready } = usePricingCurrency();

  if (!ready) return null;

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
        {/* Toggle */}
        <div className="pricing-toggle d-flex align-items-center justify-content-center text-center mb-3">
          <span className={billingType === "hourly" ? "active" : ""}>
            Flexible
          </span>

          <div className="form-check form-switch d-inline-block mx-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={billingType === "bulk"}
              onChange={() =>
                setBillingType(billingType === "hourly" ? "bulk" : "hourly")
              }
            />
          </div>

          <span className={billingType === "bulk" ? "active w-fit whitespace-nowrap" : "w-fit whitespace-nowrap"}>
            Best value <span className="badge">Save 20%</span>
          </span>
        </div>

        <div className="text-center mb-5">
          <span>*Get the best value when you book 8 or more classes together</span>
        </div>

        {/* Cards */}
        <div className="pricing-row">
          <Card
            category="General English"
            description="Everyday English for confident communication"
            basePrice={PRICES_USD.general}
            billingType={billingType}
            priceFromUSD={priceFromUSD}
            delay={100}
          />

          <Card
            category="Business English"
            description="Professional English for work and meetings"
            basePrice={PRICES_USD.business}
            billingType={billingType}
            priceFromUSD={priceFromUSD}
            popular
            delay={200}
          />

          <Card
            category="International Exam Prep"
            description="Structured preparation for international exams"
            basePrice={PRICES_USD.exam}
            billingType={billingType}
            priceFromUSD={priceFromUSD}
            delay={300}
          />
        </div>

        <p className="text-center mt-4 text-muted">
          Prices shown in {currency}
        </p>
      </div>
    </section>
     </>
  );
}

type CardProps = {
  category: string;
  description: string;
  basePrice: number;
  billingType: BillingType;
  priceFromUSD: (price: number) => string;
  popular?: boolean;
  delay?: number;
};

const Card = ({
  category,
  description,
  basePrice,
  billingType,
  priceFromUSD,
  popular,
  delay,
}: CardProps) => {
  const finalPrice =
    billingType === "bulk" ? applyDiscount(basePrice) : basePrice;

  return (
    <div
      className="w-min"
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
              <span className="amount">{priceFromUSD(finalPrice)}</span>
              <span className="unit">/hour</span>
            </div>
          </div>

          {/* <p className="pricing-description">{description}</p> */}
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
