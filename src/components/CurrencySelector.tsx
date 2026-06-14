import { MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrency } from "../features/currency/currencySlice";
import { SUPPORTED_CURRENCIES } from "../lib/currencies";

export function CurrencySelector() {
  const currency = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  return (
    <TextField
      select
      size="small"
      value={currency}
      onChange={(event) => dispatch(setCurrency(event.target.value))}
      aria-label="Select currency"
      sx={{ minWidth: 110 }}
    >
      {SUPPORTED_CURRENCIES.map((option) => (
        <MenuItem key={option.code} value={option.code}>
          {option.symbol} {option.code.toUpperCase()}
        </MenuItem>
      ))}
    </TextField>
  );
}
