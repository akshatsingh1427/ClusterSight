import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import Pods from "../pages/Pods";
import Nodes from "../pages/Nodes";
import Deployments from "../pages/Deployments";
import Services from "../pages/Services";
import Logs from "../pages/Logs";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pods" element={<Pods />} />
          <Route path="/nodes" element={<Nodes />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;