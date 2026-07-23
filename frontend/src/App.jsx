import React from "react";
import { Routes, Route, Navigate, replace } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotePage from "./pages/NotePage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notes" element={<NotePage />} />
      <Route path="*" element={<Navigate to="/notes" replace />} />
    </Routes>
  );
};

export default App;
