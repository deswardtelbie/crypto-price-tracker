import { Suspense } from "react";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Link as MuiLink,
  Toolbar,
  Typography,
} from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { CurrencySelector } from "../CurrencySelector";

export function AppLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar>
          <MuiLink
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit" }}
          >
            <CurrencyBitcoinIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Crypto Price Tracker
            </Typography>
          </MuiLink>
          <Box sx={{ flexGrow: 1 }} />
          <CurrencySelector />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Container>
    </Box>
  );
}
