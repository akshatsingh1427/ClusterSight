import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Pods from "./pages/Pods";
import Deployments from "./pages/Deployments";
import Services from "./pages/Services";
import Nodes from "./pages/Nodes";
import Events from "./pages/Events";
import Logs from "./pages/Logs";

import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pods" element={<Pods />} />
          <Route
            path="/deployments"
            element={<Deployments />}
          />
          <Route
            path="/services"
            element={<Services />}
          />
          <Route
            path="/nodes"
            element={<Nodes />}
          />
          <Route 
            path="/events" 
            element={<Events />} 
          />
          <Route 
            path="/logs" 
            element={<Logs />} 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;