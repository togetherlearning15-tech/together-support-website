import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { FAQPage } from './pages/FAQ';
import { CareersPage } from './pages/Careers';
import { CommissionersPage } from './pages/Commissioners';
import { LandlordsPage } from './pages/Landlords';
import { ServiceDetailPage } from './pages/ServiceDetail';
import { ReferralTrackerPage } from './pages/ReferralTracker';
import './styles.css';

// Scrolls to a #section on the homepage when arriving via a link like
// "/#services" from another page, and scrolls to top on normal page changes.
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/commissioners" element={<CommissionersPage />} />
        <Route path="/landlords" element={<LandlordsPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/track-referral" element={<ReferralTrackerPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
