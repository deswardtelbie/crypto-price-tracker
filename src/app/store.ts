import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coinsApi } from "../features/coins/coinsApi";
import currencyReducer, { saveCurrency } from "../features/currency/currencySlice";

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    currency: currencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
});

let lastCurrency = store.getState().currency;
store.subscribe(() => {
  const currency = store.getState().currency;
  if (currency !== lastCurrency) {
    lastCurrency = currency;
    saveCurrency(currency);
  }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
