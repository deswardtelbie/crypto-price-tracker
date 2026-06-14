import { Alert, Button } from "@mui/material";

interface LoadErrorProps {
  subject: string;
  onRetry: () => void;
}

export function LoadError({ subject, onRetry }: LoadErrorProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Retry
        </Button>
      }
    >
      Couldn't load {subject}. CoinGecko's free API may be rate-limited — try again shortly.
    </Alert>
  );
}
