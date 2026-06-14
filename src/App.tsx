import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";

const CoinDetailsPage = lazy(() =>
  import("./pages/CoinDetailsPage").then((m) => ({ default: m.CoinDetailsPage })),
);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="coins/:id" element={<CoinDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
