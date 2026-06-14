import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

export function CoinDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Typography variant="h4" sx={{ fontWeight: 700 }}>
      Coin details: {id}
    </Typography>
  );
}
