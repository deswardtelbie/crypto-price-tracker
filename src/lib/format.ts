import { getCurrency } from "./currencies";

export function formatPrice(value: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  const maximumFractionDigits = Math.abs(value) < 1 ? 6 : 2;

  if (currency.type === "crypto") {
    const digits = Math.abs(value) < 1 ? 8 : 4;
    return `${currency.symbol}${value.toLocaleString(currency.locale, {
      maximumFractionDigits: digits,
    })}`;
  }

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code.toUpperCase(),
    maximumFractionDigits,
  }).format(value);
}

export function formatCompact(value: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);

  if (currency.type === "crypto") {
    return `${currency.symbol}${value.toLocaleString(currency.locale, {
      notation: "compact",
      maximumFractionDigits: 2,
    })}`;
  }

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code.toUpperCase(),
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
