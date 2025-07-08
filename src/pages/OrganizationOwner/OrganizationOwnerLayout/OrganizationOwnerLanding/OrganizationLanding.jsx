"use client";

import { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCog,
  FaChartBar,
  // FaTrendingUp,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "../../../../components/HeroSectionOwner";

export default function OrganizationLanding() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-out-cubic",
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black ">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center">
            <img
              src="/images/freshify-logo.png"
              alt="FRESHIFY"
              className="h-8 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Locations
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Calendar
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Users
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Log in
            </a>
            <button className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      <HeroSection />
      {/* Dashboard Analytics Section */}
      <section className="px-6 py-20 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Analytics and Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Comprehensive dashboard for complete business oversight
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Monitor sales performance, track top performers, analyze service
              popularity, and manage multi-location operations from a single,
              powerful dashboard.
            </p>
          </div>

          <div
            className="relative mb-16"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <div className="animation">
              <img
                src="/images/dashboard-analytics.png"
                alt="FRESHIFY Dashboard Analytics"
                className="w-full h-auto shadow-lg rounded-lg"
              />
            </div>
          </div>

          {/* <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Sales Analytics",
                description:
                  "Track total sales ($3340) and average sales ($78) with real-time updates",
                icon: <FaChartBar className="w-6 h-6" />,
                metric: "$3340",
                label: "Total Sales",
              },
              {
                title: "Top Performers",
                description:
                  "Monitor your best barbers like Rafay Mirza ($1850) and team performance",
                // icon: <FaTrendingUp className="w-6 h-6" />,
                metric: "$1850",
                label: "Top Earner",
              },
              {
                title: "Service Popularity",
                description:
                  "Hair Cuttings (33), Beard Trim (18), and Facial (2) service tracking",
                icon: <FaUsers className="w-6 h-6" />,
                metric: "33",
                label: "Hair Cuttings",
              },
              {
                title: "Multi-Location Insights",
                description:
                  "Track performance across Islamabad (3), Haseeb location (2), and more",
                icon: <FaMapMarkerAlt className="w-6 h-6" />,
                metric: "44",
                label: "Total Orders",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-500 hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={400 + index * 100}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">
                      {item.metric}
                    </div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Payout Management Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-4 text-black">
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
              <h2 className="text-3xl font-bold mb-4 text-black">
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
              <h3 className="text-2xl font-bold mb-2 text-black">
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
      <section className="px-6 py-20 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div data-aos="fade-right">
              <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-4 border border-gray-200">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Multi-location workflows
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Collaborate across locations and teams
              </h2>
            </div>
            <div data-aos="fade-left" data-aos-delay="200">
              <p className="text-xl text-gray-600 leading-relaxed">
                Expand your barbershop operations with comprehensive location
                management that keeps all your branches aligned and coordinated.
              </p>
            </div>
          </div>

          <div
            className="relative mb-16"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div className="bg-white rounded-lg p-4 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
              <img
                src="/images/locations-management.png"
                alt="Multi-Location Management Interface"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Google Places Integration",
                description:
                  "Connect each location with Google Places for better visibility",
                icon: <FaMapMarkerAlt className="w-6 h-6" />,
              },
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
                className="text-left transition-all duration-1000 hover:scale-105"
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
      <section className="px-6 py-20 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
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
      <section className="px-6 py-20 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div data-aos="fade-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
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
              <a
                href="#"
                className="text-black font-semibold hover:underline text-lg group"
              >
                Start your free trial
                <FaArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Footer */}
      <footer className="px-6 py-16 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12" data-aos="fade-up">
            <div>
              <div className="mb-6">
                <img
                  src="/images/freshify-logo.png"
                  alt="FRESHIFY"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Complete barbershop management solution for the modern business.
                Experience excellence in every appointment, payment, and
                customer interaction.
              </p>
            </div>

            {[
              {
                title: "Platform",
                links: [
                  "Dashboard Analytics",
                  "Services Management",
                  "Calendar Scheduling",
                  "User Management",
                  "Location Control",
                  "Payment Processing",
                ],
              },
              {
                title: "Company",
                links: [
                  "About FRESHIFY",
                  "Our Mission",
                  "Careers",
                  "Press Kit",
                  "Contact Us",
                ],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "API Documentation",
                  "System Status",
                  "Feature Requests",
                  "Contact Support",
                ],
              },
            ].map((section, index) => (
              <div
                key={section.title}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <h4 className="font-bold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-t border-gray-800 pt-8 text-center text-gray-400"
            data-aos="fade-up"
          >
            <p>
              &copy; 2024 FRESHIFY. All rights reserved. Built for barbershop
              excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
