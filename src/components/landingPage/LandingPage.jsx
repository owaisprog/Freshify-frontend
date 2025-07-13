import { useEffect, useState } from "react";
import RecomendedSection from "./RecomendedSection";
import AllBarberShops from "./AllBarberShops";
import NewToFreshify from "./NewToFreshify";
import ReviewsSection from "./ReviewsSection";
import LandingPageNavbar from "./LandingPageNavbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [recomendedShops, setRecomendedShops] = useState(["Hello"]);

  const MenuIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );

  const StarIcon = ({ filled = true }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );

  const AppleIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );

  const GooglePlayIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const SmartphoneIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );

  const BarChartIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );

  const UsersIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // whether animation should happen only once
    });
  }, []);

  if (recomendedShops.length <= 1) {
    <section
      id="hero"
      className=" bg-gradient-to-r from-gray-50 via-pink-50 to-gray-50 px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden floating-shapes"
    >
      <h1
        className="text-3xl capitalize max-w-6xl text-center mx-auto sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8 sm:mb-12 bg-gradient-to-r  from-black via-gray-800 to-gray-600 bg-clip-text px-4"
        data-aos="fade-up"
      >
        Book a service
      </h1>
    </section>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Custom CSS for animations and responsive design */}

      {/* Header */}
      <LandingPageNavbar />

      {/* Hero Section */}
      <section
        id="hero"
        className=" bg-gradient-to-r from-gray-50 via-pink-50 to-gray-50 px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden floating-shapes"
      >
        <h1
          className="text-3xl max-w-6xl text-center mx-auto sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mb-8 sm:mb-12 bg-gradient-to-r capitalize from-black via-gray-800 to-gray-600 bg-clip-text px-4"
          data-aos="fade-up"
        >
          Book a service
        </h1>

        <AllBarberShops setRecomendedShops={setRecomendedShops} />
      </section>

      <RecomendedSection recomendedShops={recomendedShops} />

      {/* New to Fresha Section */}
      <NewToFreshify newToFreshify={recomendedShops} />

      {/* App Download Section */}
      {/* <section className="bg-black px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden floating-shapes">
        <div className="container  mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div
              className="text-white  order-2 lg:order-1"
              data-aos="fade-right"
            >
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span className="text-gray-300 text-sm sm:text-base">
                  Available on
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <AppleIcon />
                    <div>
                      <div className="text-xs text-gray-300">
                        Download on the
                      </div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <GooglePlayIcon />
                    <div>
                      <div className="text-xs text-gray-300">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </div>
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Download the Freshify app
              </h2>

              <p
                className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Book unforgettable beauty and wellness experiences with the
                freshify mobile app. Easy booking, instant confirmations, and
                seamless payments.
              </p>
            </div>

            <div
              className="relative  order-1 lg:order-2 flex justify-center"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="relative flex justify-center">
                <div className="relative z-20 bg-gray-500 rounded-[2rem] sm:rounded-[3rem] p-1.5 sm:p-2 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 ">
                  <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] w-56 sm:w-72 h-96 sm:h-[600px] overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-white p-3 sm:p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-300 rounded-full pulse-animation"></div>
                        <div className="text-xs sm:text-sm font-semibold">
                          Trendy Studio
                        </div>
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-300 rounded-full pulse-animation"></div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 mb-2">
                        <div className="text-sm sm:text-lg font-bold">5.0</div>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={true} />
                          ))}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          (1,743 reviews)
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        2.0km • Notting Hill, London
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-20 sm:h-32"></div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-xs sm:text-sm">
                              Men's Haircut
                            </div>
                            <div className="text-xs text-gray-500">45 min</div>
                          </div>
                          <div className="font-bold text-xs sm:text-sm">
                            £25
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-xs sm:text-sm">
                              Beard Trim
                            </div>
                            <div className="text-xs text-gray-500">30 min</div>
                          </div>
                          <div className="font-bold text-xs sm:text-sm">
                            £15
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-xs sm:text-sm">
                              Hair Wash
                            </div>
                            <div className="text-xs text-gray-500">15 min</div>
                          </div>
                          <div className="font-bold text-xs sm:text-sm">
                            £10
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-black text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-xs sm:text-sm">
                        Book now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 sm:-right-8 md:-right-16 h-full top-8 sm:top-12 z-10 bg-gray-500 rounded-[1.5rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="bg-white h-full rounded-[1rem] sm:rounded-[2rem] w-56 sm:w-72 overflow-hidden">
                    <div className="p-3 sm:p-4">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-16 sm:h-24 mb-3 sm:mb-4"></div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="h-2 sm:h-3 bg-gray-200 rounded"></div>
                        <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Fresha for Business Section */}
      <section className="bg-black px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden floating-shapes">
        <div className="container  mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text">
                Freshify for Business
              </h2>

              <p
                className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Supercharge your business with the world&apos;s top booking
                platform for salons and spas.
              </p>
              <p
                className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Independently voted no. 1 by industry professionals.
              </p>

              <div
                className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <button className="bg-white hover:bg-gray-100 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                  <DownloadIcon />
                  Become Partner
                </button>
              </div>

              <div
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    Excellent 5/5
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={true} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                  <div className="text-center text-white">
                    <BarChartIcon />
                    <div className="text-xs sm:text-sm font-semibold mt-2">
                      Analytics
                    </div>
                  </div>
                  <div className="text-center text-white">
                    <UsersIcon />
                    <div className="text-xs sm:text-sm font-semibold mt-2">
                      Team Management
                    </div>
                  </div>
                  <div className="text-center text-white">
                    <SmartphoneIcon />
                    <div className="text-xs sm:text-sm font-semibold mt-2">
                      Mobile App
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative order-1  lg:order-2"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-500 hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                        F
                      </div>
                      <div>
                        <div className="font-semibold text-black text-sm sm:text-base">
                          The 7th Heaven Beauty
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Dashboard
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Tuesday 27 Aug, 2023
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="text-lg sm:text-2xl font-bold text-black">
                        24
                      </div>
                      <div className="text-xs text-gray-500">
                        Today's bookings
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="text-lg sm:text-2xl font-bold text-black">
                        £1,240
                      </div>
                      <div className="text-xs text-gray-500">
                        Today's revenue
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="text-lg sm:text-2xl font-bold text-black">
                        4.9
                      </div>
                      <div className="text-xs text-gray-500">Avg rating</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-base sm:text-lg font-semibold text-black">
                      Today's Schedule
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {[
                      {
                        time: "9:00 - 10:00",
                        name: "Brenda Massey",
                        service: "Blow Dry",
                        color:
                          "bg-gradient-to-r from-blue-100 to-blue-200 border-blue-200",
                      },
                      {
                        time: "9:00 - 10:00",
                        name: "Zachary Kelley",
                        service: "Beard Grooming",
                        color:
                          "bg-gradient-to-r from-pink-100 to-pink-200 border-pink-200",
                      },
                      {
                        time: "10:00 - 11:00",
                        name: "Jenny Murtaugh",
                        service: "Massage",
                        color:
                          "bg-gradient-to-r from-green-100 to-green-200 border-green-200",
                      },
                      {
                        time: "9:45 - 11:00",
                        name: "Diana Campos",
                        service: "Balinese Massage",
                        color:
                          "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-200",
                      },
                    ].map((appointment, i) => (
                      <div
                        key={i}
                        className={`${appointment.color} border rounded-lg p-2 sm:p-3 hover:shadow-md transition-all duration-300 hover:scale-105`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-black">
                              {appointment.time}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-700">
                              {appointment.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {appointment.service}
                            </div>
                          </div>
                          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full border border-gray-200 pulse-animation"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-gray-500 rounded-2xl sm:rounded-3xl p-2 sm:p-2 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <div className="bg-white rounded-xl sm:rounded-2xl w-32 sm:w-48 h-40 sm:h-64 p-3 sm:p-4">
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-black to-gray-700 rounded-lg mx-auto mb-2"></div>
                    <div className="text-xs font-semibold">Business App</div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded h-3 sm:h-6"></div>
                    <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded h-2 sm:h-4 w-3/4"></div>
                    <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded h-2 sm:h-4 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Reviews Section */}
      <ReviewsSection />
      {/* Statistics Section */}
      <section className="bg-gray-100 px-4 sm:px-6 py-12 sm:py-20 relative overflow-hidden floating-shapes">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            className="text-2xl capitalize sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4"
            data-aos="fade-up"
          >
            The top-rated destination for beauty and wellness
          </h2>
          <p
            className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 px-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            One solution, one software. Trusted by the best in the beauty and
            wellness industry
          </p>

          <div
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-3 sm:mb-4 bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text pulse-animation"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            Thousands +
          </div>
          <p
            className="text-base sm:text-lg text-gray-600 mb-12 sm:mb-16"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Appointments booked on Freshify
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {[
              { number: "130+", text: "partner businesses" },
              { number: "10+ countries", text: "using Freshify" },
              { number: "45,000+", text: "stylists and professionals" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl bg-white  border border-gray-100 card-hover"
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
