import { useState } from "react";
import {
  Box,
  Paper,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetMarketChartQuery } from "./coinsApi";
import type { PricePoint } from "./types";
import { formatCompact, formatPrice } from "../../lib/format";
import { LoadError } from "../../components/LoadError";

const RANGES = [
  { label: "24H", days: 1 },
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "1Y", days: 365 },
];

interface PriceChartProps {
  coinId: string;
  currency: string;
}

function formatTick(timestamp: number, days: number): string {
  const date = new Date(timestamp);
  if (days <= 1) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: { payload: PricePoint }[];
  currency: string;
}

function ChartTooltip({ active, payload, currency }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <Paper variant="outlined" sx={{ px: 1.5, py: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {new Date(point.timestamp).toLocaleString()}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {formatPrice(point.price, currency)}
      </Typography>
    </Paper>
  );
}

export function PriceChart({ coinId, currency }: PriceChartProps) {
  const theme = useTheme();
  const [days, setDays] = useState(7);
  const { data: points, isLoading, isError, refetch } = useGetMarketChartQuery({
    id: coinId,
    vsCurrency: currency,
    days,
  });

  const rising = !!points && points.length > 1 && points[points.length - 1].price >= points[0].price;
  const color = rising ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Price chart
        </Typography>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={days}
          onChange={(_event, value: number | null) => {
            if (value !== null) setDays(value);
          }}
        >
          {RANGES.map((range) => (
            <ToggleButton key={range.days} value={range.days}>
              {range.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {isError && <LoadError subject="price history" onRetry={refetch} />}

      {isLoading && <Skeleton variant="rounded" height={320} />}

      {points && (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={points} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value: number) => formatTick(value, days)}
              tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
              stroke={theme.palette.divider}
              minTickGap={48}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value: number) => formatCompact(value, currency)}
              tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
              stroke={theme.palette.divider}
              width={72}
            />
            <Tooltip content={<ChartTooltip currency={currency} />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill="url(#priceFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
