import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Subscribe from "./pages/Subscribe";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import PrivateRoutes from "./components/PrivateRoutes"; // Assurez-vous d'importer PrivateRoutes

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/subscribe" element={<Subscribe />} />

          {/* Protéger les routes à l'intérieur de PrivateRoutes */}
          <Route element={<PrivateRoutes />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/calendar"
              element={
                <Layout>
                  <Calendar />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
