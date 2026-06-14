export interface Currency {
  code: string;
  label: string;
  symbol: string;
  type: "fiat" | "crypto";
  locale: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "zar", label: "South African Rand", symbol: "R", type: "fiat", locale: "en-ZA" },
  { code: "usd", label: "US Dollar", symbol: "$", type: "fiat", locale: "en-US" },
  { code: "eur", label: "Euro", symbol: "€", type: "fiat", locale: "de-DE" },
  { code: "gbp", label: "British Pound", symbol: "£", type: "fiat", locale: "en-GB" },
  { code: "btc", label: "Bitcoin", symbol: "₿", type: "crypto", locale: "en-US" },
  { code: "eth", label: "Ethereum", symbol: "Ξ", type: "crypto", locale: "en-US" },
];

export const DEFAULT_CURRENCY = "zar";

export function getCurrency(code: string): Currency {
  return SUPPORTED_CURRENCIES.find((c) => c.code === code) ?? SUPPORTED_CURRENCIES[0];
}
