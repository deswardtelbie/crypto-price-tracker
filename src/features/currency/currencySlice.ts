import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_CURRENCY, getCurrency } from "../../lib/currencies";

const STORAGE_KEY = "vsCurrency";

export function loadCurrency(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? getCurrency(saved).code : DEFAULT_CURRENCY;
}

export function saveCurrency(code: string): void {
  localStorage.setItem(STORAGE_KEY, code);
}

const currencySlice = createSlice({
  name: "currency",
  initialState: loadCurrency(),
  reducers: {
    setCurrency: (_state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
