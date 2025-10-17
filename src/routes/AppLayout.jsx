import { Route, Routes, useLocation } from "react-router-dom";

import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Header from "../ui/Header";
import CommunityImpactSection from "./../pages/CommunityEvents";
import FlagshipProgramsSection from "./../pages/FlagShipProg";
import HomeSection from "./../pages/Home";
import OurTeam from "./../pages/OurTeam";
import PastEvents from "./../pages/PastEvent";
import PlanOfAction from "./../pages/PlanOfAction";
import SignatureEventsSection from "./../pages/SignatureEvents";
import WeeklyCadenceSection from "./../pages/WeeklyCadence";
import WorkshopsSection from "./../pages/WorkShop";
import Footer from "./../ui/Footer";
import Navigation from "./../ui/Navigation";
import sections from "./RouteLinkSession";

function AppLayout() {
  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    const section = sections.find((s) => s.path === path);
    return section ? section.id : "home";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation sections={sections} currentPage={getCurrentPage()} />

      <main>
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/plan-of-action" element={<PlanOfAction />} />
          <Route
            path="/flagship-programs"
            element={<FlagshipProgramsSection />}
          />
          <Route path="/workshops" element={<WorkshopsSection />} />
          <Route path="/weekly-cadence" element={<WeeklyCadenceSection />} />
          <Route
            path="/signature-events"
            element={<SignatureEventsSection />}
          />
          <Route
            path="/community-impact"
            element={<CommunityImpactSection />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
