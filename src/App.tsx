import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FormPage } from "./pages/FormPage";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}