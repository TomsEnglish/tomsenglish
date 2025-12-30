"use client";

import { useEffect, useMemo, useState } from "react";

/* =========================
   Region → Currency mapping
   Americas + Asia only
========================= */

const REGION_TO_CURRENCY: Record<string, string> = {
  // North America
  US: "USD",
  CA: "CAD",
  MX: "MXN",

  // Central America
  GT: "GTQ",
  BZ: "BZD",
  SV: "USD",
  HN: "HNL",
  NI: "NIO",
  CR: "CRC",
  PA: "USD",

  // Caribbean
  CU: "CUP",
  DO: "DOP",
  HT: "HTG",
  JM: "JMD",
  TT: "TTD",
  BS: "BSD",
  BB: "BBD",
  GD: "XCD",
  LC: "XCD",
  VC: "XCD",
  AG: "XCD",
  DM: "XCD",
  KN: "XCD",

  // South America
  AR: "ARS",
  BO: "BOB",
  BR: "BRL",
  CL: "CLP",
  CO: "COP",
  EC: "USD",
  GY: "GYD",
  PY: "PYG",
  PE: "PEN",
  SR: "SRD",
  UY: "UYU",
  VE: "VES",

  // East Asia
  CN: "CNY",
  JP: "JPY",
  KR: "KRW",
  TW: "TWD",
  HK: "HKD",
  MO: "MOP",
  MN: "MNT",

  // Southeast Asia
  SG: "SGD",
  MY: "MYR",
  TH: "THB",
  ID: "IDR",
  PH: "PHP",
  VN: "VND",
  KH: "KHR",
  LA: "LAK",
  MM: "MMK",
  BN: "BND",
  TL: "USD",

  // South Asia
  IN: "INR",
  PK: "PKR",
  BD: "BDT",
  LK: "LKR",
  NP: "NPR",
  BT: "BTN",
  MV: "MVR",

  // Central Asia
  KZ: "KZT",
  UZ: "UZS",
  TM: "TMT",
  KG: "KGS",
  TJ: "TJS",

  // Western Asia / Middle East
  AE: "AED",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  OM: "OMR",
  BH: "BHD",
  IL: "ILS",
  TR: "TRY",
  IR: "IRR",
  IQ: "IQD",
  JO: "JOD",
  LB: "LBP",
  SY: "SYP",
  YE: "YER",

  // Caucasus
  AM: "AMD",
  GE: "GEL",
  AZ: "AZN",
};

/* =========================
   Rounding rules per currency
========================= */

const ROUNDING_RULES: Record<string, number> = {
  // High inflation / large numbers
  ARS: 1000,
  COP: 1000,
  VND: 1000,

  // Medium
  MXN: 50,
  BRL: 50,
  PHP: 50,

  // Zero-decimal
  JPY: 100,
  KRW: 100,

  DEFAULT: 1,
};

/* =========================
   Types
========================= */

type RatesPayload = {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
};

/* =========================
   Helpers
========================= */

function getCurrencyFromLocale(locale: string): string {
  const region = locale.split("-")[1];
  return region ? REGION_TO_CURRENCY[region] ?? "USD" : "USD";
}

function smartRound(
  value: number,
  usd: number,
  rate: number,
  currency: string
) {
  const step = ROUNDING_RULES[currency] ?? ROUNDING_RULES.DEFAULT;
  const rounded = Math.round(value / step) * step;

  // Convert rounding delta back to USD
  const deltaUSD = Math.abs((rounded - value) / rate);

  // Allow rounding only if ≤ $1 USD
  return deltaUSD <= 1 ? rounded : value;
}

/* =========================
   Hook
========================= */

export function usePricingCurrency() {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const locale = navigator.language || "en-US";
    setCurrency(getCurrencyFromLocale(locale));

    fetch("/rates.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load cached rates");
        return res.json();
      })
      .then((data: RatesPayload) => {
        if (!data?.rates) throw new Error("Invalid rates payload");
        setRates(data.rates);
        setReady(true);
      })
      .catch((err) => {
        console.error("Using USD fallback:", err);
        setReady(true);
      });
  }, []);

  const priceFromUSD = useMemo(() => {
    return (usd: number): string => {
      if (!rates || !rates[currency]) {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(usd);
      }

      const rate = rates[currency];
      const raw = usd * rate;

      const rounded = smartRound(raw, usd, rate, currency);

      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(rounded);
    };
  }, [rates, currency]);

  return {
    currency,
    priceFromUSD,
    ready,
  };
}
