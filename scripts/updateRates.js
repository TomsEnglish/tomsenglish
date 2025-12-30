import fs from "fs";
import path from "path";

const URL = `https://api.exchangerate.host/live?access_key=${process.env.EXCHANGERATEHOST_KEY}`;
const OUTPUT_PATH = path.resolve("public", "rates.json");

async function updateRates() {
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!data?.success || !data?.quotes || !data?.source) {
      throw new Error("Invalid API response");
    }

    // Normalize quotes → rates
    const rates = Object.fromEntries(
      Object.entries(data.quotes).map(([key, value]) => {
        // "USDARS" → "ARS"
        const currency = key.replace(data.source, "");
        return [currency, value];
      })
    );

    const payload = {
      base: data.source,
      rates,
      fetchedAt: new Date().toISOString(),
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));
    console.log("Exchange rates updated successfully");
  } catch (err) {
    console.error("Failed to update exchange rates:", err.message);
    process.exit(1);
  }
}

updateRates();
