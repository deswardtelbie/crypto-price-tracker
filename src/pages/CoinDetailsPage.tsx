import { Link as RouterLink, useParams } from "react-router-dom";
import { Alert, Avatar, Box, Button, Chip, Paper, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "../app/hooks";
import { useGetCoinQuery } from "../features/coins/coinsApi";
import type { CoinMarket } from "../features/coins/types";
import { formatCompact, formatNumber, formatPercent, formatPrice } from "../lib/format";

export function CoinDetailsPage() {
  const { id = "" } = useParams<{ id: string }>();
  const currency = useAppSelector((state) => state.currency);
  const { data: coin, isLoading, isError, isSuccess, refetch } = useGetCoinQuery({
    id,
    vsCurrency: currency,
  });

  return (
    <Box>
      <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back
      </Button>

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          Couldn't load coin data. CoinGecko's free API may be rate-limited — try again shortly.
        </Alert>
      )}

      {isSuccess && !coin && <Alert severity="warning">No coin found for "{id}".</Alert>}

      {isLoading && <Skeleton variant="rounded" height={360} />}

      {coin && <CoinDetails coin={coin} currency={currency} />}
    </Box>
  );
}

function CoinDetails({ coin, currency }: { coin: CoinMarket; currency: string }) {
  const change = coin.price_change_percentage_24h ?? 0;
  const changeColor = change >= 0 ? "success.main" : "error.main";

  const stats = [
    { label: "Market Cap", value: formatCompact(coin.market_cap, currency) },
    { label: "24h Volume", value: formatCompact(coin.total_volume, currency) },
    { label: "24h High", value: formatPrice(coin.high_24h, currency) },
    { label: "24h Low", value: formatPrice(coin.low_24h, currency) },
    { label: "All-Time High", value: formatPrice(coin.ath, currency) },
    { label: "All-Time Low", value: formatPrice(coin.atl, currency) },
    { label: "Circulating Supply", value: formatNumber(coin.circulating_supply) },
    { label: "Total Supply", value: formatNumber(coin.total_supply) },
    { label: "Max Supply", value: formatNumber(coin.max_supply) },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        <Avatar src={coin.image} alt={coin.name} sx={{ width: 48, height: 48 }} />
        <Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {coin.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {coin.symbol.toUpperCase()}
            </Typography>
            <Chip label={`Rank #${coin.market_cap_rank}`} size="small" color="primary" />
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "baseline" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {formatPrice(coin.current_price, currency)}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: changeColor, fontWeight: 600 }}>
              {formatPercent(change)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
        }}
      >
        {stats.map((stat) => (
          <Paper key={stat.label} variant="outlined" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {stat.label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {stat.value}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
