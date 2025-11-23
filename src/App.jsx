// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginAnimation from "./pages/Auth/LoginAnimation"; 
import LandingPage from "./pages/Landing/landing";
import HomePage from "./pages/Beranda";
import CataloguePage from "./pages/Katalog";
import ProductDetailPage from "./pages/ProductDetail";
import ProfilePage from "./pages/Profile/Profile.jsx";

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
          <Route path="/login" element={<LoginAnimation />} />
          <Route path="/register" element={<LoginAnimation />} />
          
          {/* ------------------------------- */}

          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route
            path="/catalogue"
            element={<PrivateRoute element={CataloguePage} />}
          />
          <Route
            path="/product/:id"
            element={<PrivateRoute element={ProductDetailPage} />}
          />

          
          <Route 
            path="/profile" 
            element={<PrivateRoute element={ProfilePage} />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;