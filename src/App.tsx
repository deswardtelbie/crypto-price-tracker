import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { CoinDetailsPage } from "./pages/CoinDetailsPage";

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
