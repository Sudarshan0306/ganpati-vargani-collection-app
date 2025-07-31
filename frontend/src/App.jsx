// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import TaxonomyForm from "./pages/TaxonomyForm";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["collector"]} />}>
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/form" element={<TaxonomyForm />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
