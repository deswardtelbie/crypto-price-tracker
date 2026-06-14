import { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Skeleton, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { useGetMarketsQuery } from "../features/coins/coinsApi";
import { CoinsTable } from "../features/coins/CoinsTable";

const PER_PAGE = 50;

export function DashboardPage() {
  const currency = useAppSelector((state) => state.currency);
  const [page, setPage] = useState(1);

  // Switching currency starts a fresh cache entry, so restart paging from page 1.
  const [trackedCurrency, setTrackedCurrency] = useState(currency);
  if (currency !== trackedCurrency) {
    setTrackedCurrency(currency);
    setPage(1);
  }

  const { data: coins, isLoading, isFetching, isError, refetch } = useGetMarketsQuery({
    vsCurrency: currency,
    page,
    perPage: PER_PAGE,
  });

  const hasMore = !!coins && coins.length === page * PER_PAGE;

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || isFetching) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage((current) => current + 1);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isFetching]);

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

      <Box ref={sentinelRef} sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        {isFetching && !isLoading && <CircularProgress size={28} />}
      </Box>
    </Box>
  );
}
