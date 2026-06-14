import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { CoinMarket } from "./types";
import { formatCompact, formatPercent, formatPrice } from "../../lib/format";

interface CoinsTableProps {
  coins: CoinMarket[];
  currency: string;
}

const hideXs = { display: { xs: "none", sm: "table-cell" } } as const;
const hideSm = { display: { xs: "none", md: "table-cell" } } as const;

export function CoinsTable({ coins, currency }: CoinsTableProps) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h</TableCell>
            <TableCell align="right" sx={hideXs}>
              Market Cap
            </TableCell>
            <TableCell align="right" sx={hideSm}>
              Volume (24h)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => {
            const change = coin.price_change_percentage_24h ?? 0;
            return (
              <TableRow
                key={coin.id}
                hover
                onClick={() => navigate(`/coins/${coin.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell sx={{ color: "text.secondary" }}>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar src={coin.image} alt={coin.name} sx={{ width: 28, height: 28 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {coin.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {coin.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{formatPrice(coin.current_price, currency)}</TableCell>
                <TableCell
                  align="right"
                  sx={{ color: change >= 0 ? "success.main" : "error.main", fontWeight: 600 }}
                >
                  {formatPercent(change)}
                </TableCell>
                <TableCell align="right" sx={hideXs}>
                  {formatCompact(coin.market_cap, currency)}
                </TableCell>
                <TableCell align="right" sx={hideSm}>
                  {formatCompact(coin.total_volume, currency)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
