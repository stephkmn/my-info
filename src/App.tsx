import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FormPage } from "./pages/FormPage";
import { LandingPage } from "./pages/LandingPage";
import { QRPage } from "./pages/QRPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </BrowserRouter>
  );
}