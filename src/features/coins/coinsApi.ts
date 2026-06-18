import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type {
  CoinMarket,
  CoinQueryArgs,
  MarketChartArgs,
  MarketChartResponse,
  MarketsQueryArgs,
  PricePoint,
} from "./types";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Optional Demo key for a higher rate limit.
const DEMO_API_KEY = import.meta.env.VITE_CG_DEMO_KEY;

const rawBaseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Key goes in a query param, not a header, to avoid a CORS preflight on every request.
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = (args, api, opts) => {
  if (!DEMO_API_KEY) return rawBaseQuery(args, api, opts);
  const req: FetchArgs = typeof args === "string" ? { url: args } : args;
  return rawBaseQuery({ ...req, params: { ...req.params, x_cg_demo_api_key: DEMO_API_KEY } }, api, opts);
};

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery,
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
      serializeQueryArgs: ({ queryArgs: { vsCurrency, perPage } }) => ({ vsCurrency, perPage }),
      merge: (cache, incoming, { arg }) => {
        if (arg.page === 1) return incoming;
        const seen = new Set(cache.map((coin) => coin.id));
        cache.push(...incoming.filter((coin) => !seen.has(coin.id)));
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
    }),
    getCoin: builder.query<CoinMarket | undefined, CoinQueryArgs>({
      query: ({ id, vsCurrency }) => ({
        url: "/coins/markets",
        params: { vs_currency: vsCurrency, ids: id, sparkline: false },
      }),
      transformResponse: (response: CoinMarket[]) => response[0],
    }),
    getMarketChart: builder.query<PricePoint[], MarketChartArgs>({
      query: ({ id, vsCurrency, days }) => ({
        url: `/coins/${id}/market_chart`,
        params: { vs_currency: vsCurrency, days },
      }),
      transformResponse: (response: MarketChartResponse) =>
        response.prices.map(([timestamp, price]) => ({ timestamp, price })),
    }),
  }),
});

export const { useGetMarketsQuery, useGetCoinQuery, useGetMarketChartQuery } = coinsApi;
