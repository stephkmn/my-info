import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FormPage } from "./pages/FormPage";
import { LandingPage } from "./pages/LandingPage";
import { QRPage } from "./pages/QRPage";
import { EmergencyInfoPage } from "./pages/EmergencyInfoPage";
import { AuthPage } from "./pages/AuthPage";
import { NavigationDrawer } from "./components/NavigationDrawer";

export default function App() {
  return (
    <BrowserRouter>
      <NavigationDrawer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/qr/:qrId" element={<QRPage />} />
        <Route path="/:qrId" element={<EmergencyInfoPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
