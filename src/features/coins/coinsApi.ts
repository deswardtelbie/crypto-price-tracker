import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CoinMarket, CoinQueryArgs, MarketsQueryArgs } from "./types";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMarkets: builder.query<CoinMarket[], MarketsQueryArgs>({
      query: ({ vsCurrency, page = 1, perPage = 50 }) => ({
        url: "/coins/markets",
        params: {
          vs_currency: vsCurrency,
          order: "market_cap_desc",
          per_page: perPage,
          page,
          sparkline: false,
        },
      }),
    }),
    getCoin: builder.query<CoinMarket | undefined, CoinQueryArgs>({
      query: ({ id, vsCurrency }) => ({
        url: "/coins/markets",
        params: { vs_currency: vsCurrency, ids: id, sparkline: false },
      }),
      transformResponse: (response: CoinMarket[]) => response[0],
    }),
  }),
});

export const { useGetMarketsQuery, useGetCoinQuery } = coinsApi;
