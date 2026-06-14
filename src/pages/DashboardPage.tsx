import { Alert, Box, Button, Skeleton, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useGetMarketsQuery } from "../features/coins/coinsApi";
import { CoinsTable } from "../features/coins/CoinsTable";

export function DashboardPage() {
  const currency = useAppSelector((state) => state.currency);
  const { data: coins, isLoading, isError, refetch } = useGetMarketsQuery({ vsCurrency: currency });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Top Cryptocurrencies
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Ranked by market cap · prices in {currency.toUpperCase()}
      </Typography>

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          Couldn't load market data. CoinGecko's free API may be rate-limited — try again shortly.
        </Alert>
      )}

      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} height={56} sx={{ my: 0.5 }} />
        ))}

      {coins && <CoinsTable coins={coins} currency={currency} />}
    </Box>
  );
}
