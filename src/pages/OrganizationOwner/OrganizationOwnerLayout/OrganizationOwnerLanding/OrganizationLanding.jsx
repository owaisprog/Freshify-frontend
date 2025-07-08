"use client";

import { useEffect } from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCreditCard,
  FaCog,
  // FaTrendingUp,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "../../../../components/HeroSectionOwner";
import { Link } from "react-router-dom";
import LandingPageNavbar from "../../../../components/landingPage/LandingPageNavbar";
import Footer from "../../../../components/landingPage/Footer";

export default function OrganizationLanding() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // whether animation should happen only once
    });
  }, []);

  return (
    <div id="organizaton-home" className="min-h-screen  bg-white text-black ">
      <LandingPageNavbar />
      <HeroSection />
      {/* Dashboard Analytics Section */}
      <section id="organization-analytics" className=" py-20  px-4 w-full  ">
        <div className="container overflow-hidden mx-auto ">
          <div className=" mb-6" data-aos="fade-up">
            <div className="flex w-fit items-center lg:justify-center lg:mx-auto gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Analytics and Insights
            </div>
            <h2 className="max-w-5xl mx-auto text-4xl lg:text-center capitalize md:text-5xl font-bold mb-6 text-black">
              Comprehensive dashboard for complete business oversight
            </h2>
            <p className="text-xl lg:text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Monitor sales performance, track top performers, analyze service
              popularity, and manage multi-location operations from a single,
              powerful dashboard.
            </p>
          </div>

          <div
            className="relative  mx-auto mb-16"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <div className="animation">
              <img
                src="/images/dashboard-analytics.png"
                alt="FRESHIFY Dashboard Analytics"
                className="w-[85%] mx-auto h-auto shadow-lg rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payout Management Section */}
      <section className=" px-4 mb-6 lg:mb-12 ">
        <div className="container overflow-hidden mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div data-aos="fade-right">
              <h2 className="text-3xl capitalize font-bold mb-4 text-black">
                Manage payouts end-to-end
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Integrate with Stripe for seamless payment processing. Connect
                once, then initiate payouts and manage financial transactions in
                one centralized location.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500">
                <img
                  src="/images/payout-stripe.png"
                  alt="Stripe Payout Management"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-3xl capitalize font-bold mb-4 text-black">
                Service analytics
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Track your most popular services and revenue streams with
                built-in analytics and reporting.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500">
                <img
                  src="/images/services-overview.png"
                  alt="Service Analytics Dashboard"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div
            className=" rounded-lg p-8 shadow-lg border bg-white border-gray-200 transition-all duration-1000 "
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="mb-6">
              <h3 className="text-3xl capitalize font-bold mb-4 text-black">
                Comprehensive service management
              </h3>
              <p className="text-gray-600">
                Control pricing, duration, availability, and descriptions across
                all locations
              </p>
            </div>
            <div className=" rounded-lg p-4">
              <img
                src="/images/services-management.png"
                alt="Complete Service Management Interface"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services & Collaboration Section */}
      <section id="organization-locations" className=" py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className=" mb-6" data-aos="fade-up">
            <div className="flex w-fit items-center lg:justify-center lg:mx-auto gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 shadow-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Multi-location workflows
            </div>
            <h2 className="max-w-5xl mx-auto text-4xl lg:text-center capitalize md:text-5xl font-bold mb-6 text-black">
              Collaborate across locations and teams
            </h2>
            <p className="text-xl lg:text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Expand your barbershop operations with comprehensive location
              management that keeps all your branches aligned and coordinated.
            </p>
          </div>
          <div
            className="relative mb-16"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div className=" animation  rounded-lg p-4   transition-all duration-500">
              <img
                src="/images/locations-management.png"
                alt="Multi-Location Management Interface"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8 lg:pt-16">
            {[
              {
                title: "On-site Payment Control",
                description: "Enable or disable on-site payments per location",
                icon: <FaCreditCard className="w-6 h-6" />,
              },
              {
                title: "Working Hours Management",
                description: "Set individual working hours for each location",
                icon: <FaCalendarAlt className="w-6 h-6" />,
              },
              {
                title: "Location Descriptions",
                description:
                  "Customize descriptions and details for each branch",
                icon: <FaCog className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="text-left shadow-md rounded-xl   p-4"
                data-aos="fade-up"
                data-aos-delay={600 + index * 100}
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 text-gray-600 shadow-sm border border-gray-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Assignment Section */}
      <section className=" px-4 py-20">
        <div className="container mx-auto overflow-hidden">
          <div className="lg:text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold capitalize mb-6 text-black">
              Smart user management that scales with your business
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-600 mb-2">
                <strong className="text-black">
                  FRESHIFY for Organizations.
                </strong>{" "}
                Create and manage two types of users: Professionals (barbers)
                and Admins for specific locations to handle operations
                efficiently.
              </p>
            </div>
          </div>

          <div
            className="max-w-4xl mx-auto mb-16"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-500">
              <img
                src="/images/users-management.png"
                alt="User Management System"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-right" data-aos-delay="500">
              <h3 className="text-2xl font-bold mb-4 text-black">
                Professional Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track your top-performing barbers with detailed analytics.
                Monitor sales, orders, and performance metrics to optimize your
                teams productivity.
              </p>
            </div>
            <div data-aos="fade-left" data-aos-delay="700">
              <h3 className="text-2xl font-bold mb-4 text-black">
                Admin Control System
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Assign location-specific administrators to handle day-to-day
                operations. Each admin can manage their assigned locations
                services, schedules, and customer interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar & Scheduling Section */}
      <section className=" py-20 px-4 bg-gray-50">
        <div className="container mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl capitalize font-bold mb-6 text-black">
                Made for modern barbershop scheduling
              </h2>
            </div>
            <div data-aos="fade-left" data-aos-delay="200">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                FRESHIFY is shaped by the practices and principles that
                distinguish world-class barbershop operations: efficient
                scheduling, seamless payments, and comprehensive business
                management.
              </p>

              <Link
                to={"/login?role=organization_owner"}
                className="text-black font-semibold hover:underline text-lg group"
              >
                Get Started
                <FaArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Smart calendar scheduling",
                description:
                  "Select any date to view appointments with detailed customer, professional, and payment information",
                visual: (
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <img
                      src="/images/calendar-appointments.png"
                      alt="Calendar Scheduling Interface"
                      className="w-full h-auto rounded"
                    />
                  </div>
                ),
              },
              {
                title: "Advanced settings control",
                description:
                  "Manage booking restrictions, subscription settings, invoice generation, and organizational preferences",
                visual: (
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <img
                      src="/images/settings-page.png"
                      alt="Advanced Settings Interface"
                      className="w-full h-auto rounded"
                    />
                  </div>
                ),
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={400 + index * 200}
              >
                <div className="mb-6 h-48 flex items-center justify-center overflow-hidden">
                  {feature.visual}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section  */}
      <Footer />
    </div>
  );
}
