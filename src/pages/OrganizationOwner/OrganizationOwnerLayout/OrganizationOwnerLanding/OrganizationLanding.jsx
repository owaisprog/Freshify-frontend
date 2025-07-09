"use client";

import { useEffect } from "react";
import {} from // FaTrendingUp,
"react-icons/fa";

import HeroSection from "../../../../components/HeroSectionOwner";
import LandingPageNavbar from "../../../../components/landingPage/LandingPageNavbar";
import Footer from "../../../../components/landingPage/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardAnalytics from "./DashboardAnalytics";
import PayoutManagement from "./PayoutManagement";
import ServicesSection from "./ServicesSection";
import UserAssignmentSection from "./UserAssignmentSection";
import CalendarSection from "./CalendarSection";

export default function OrganizationLanding() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // whether animation should happen only once - try changing this to true
      easing: "ease-in-out", // add easing
      offset: 100, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of data-aos as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    });

    // Refresh AOS on component mount to ensure it detects all elements
    AOS.refresh();

    // Cleanup function to properly destroy AOS on unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  // Add a separate useEffect to handle route changes or dynamic content
  useEffect(() => {
    // Refresh AOS when component updates
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <LandingPageNavbar />
      <div
        id="organizaton-home"
        className="min-h-screen overflow-hidden bg-white text-black "
      >
        <HeroSection />

        {/* Dashboard Analytics Section */}
        <DashboardAnalytics />
        {/* Payout Management Section */}
        <PayoutManagement />
        {/* Services & Collaboration Section */}
        <ServicesSection />
        {/* User Assignment Section */}
        <UserAssignmentSection />
        {/* Calendar & Scheduling Section */}
        <CalendarSection />
        {/* Footer Section  */}
        <Footer />
      </div>
    </>
  );
}
