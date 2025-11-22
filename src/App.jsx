// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/Landing/Landing";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import HomePage from "./pages/Beranda";
import CataloguePage from "./pages/Katalog";
import ProductDetailPage from "./pages/ProductDetail";
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center pt-20">Memuat...</div>;
  return user ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route
            path="/catalogue"
            element={<PrivateRoute element={CataloguePage} />}
          />
          <Route
            path="/product/:id"
            element={<PrivateRoute element={ProductDetailPage} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
