import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3861fb" },
    success: { main: "#16c784" },
    error: { main: "#ea3943" },
    background: {
      default: "#0e1117",
      paper: "#161b22",
    },
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  shape: { borderRadius: 10 },
});
