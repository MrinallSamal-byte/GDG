import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Navigation from "../ui/Navigation";
import sections from "./RouteLinkSession";
import { pagesSchema } from "../data/pagesSchema";
import PollPopup from "../components/PollPopup";

function AppLayout() {
  const location = useLocation();
  const [showPoll, setShowPoll] = useState(true);
  const [pollCompleted, setPollCompleted] = useState(false);

  // Reset poll check when navigating to home page
  useEffect(() => {
    if (location.pathname === "/") {
      const hasSeenPoll = sessionStorage.getItem("pollShownThisSession");
      if (!hasSeenPoll) {
        setShowPoll(true);
      }
    }
  }, [location.pathname]);

  const getCurrentPage = () => {
    const path = location.pathname;
    const section = sections.find((s) => s.path === path);
    return section ? section.id : "home";
  };

  const handlePollComplete = () => {
    setShowPoll(false);
    setPollCompleted(true);
    sessionStorage.setItem("pollShownThisSession", "true");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Show poll popup only on home page and if not completed */}
      {showPoll && location.pathname === "/" && <PollPopup onComplete={handlePollComplete} />}
      
      <Header />
      <Navigation sections={sections} currentPage={getCurrentPage()} />

      <main>
        <Routes>
          {pagesSchema.map(({ path, component: Component }, idx) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
