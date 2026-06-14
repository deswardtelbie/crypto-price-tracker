export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number | null;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  atl: number;
  last_updated: string;
}

export interface MarketsQueryArgs {
  vsCurrency: string;
  page?: number;
  perPage?: number;
}

export interface CoinQueryArgs {
  id: string;
  vsCurrency: string;
}

export interface MarketChartArgs {
  id: string;
  vsCurrency: string;
  days: number;
}

export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface PricePoint {
  timestamp: number;
  price: number;
}
