import { useState, useEffect, useRef } from "react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaCut,
} from "react-icons/fa";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const fullText = "FRESHIFY Professional Barbershop Management";
  const typingSpeed = 60; // ms per character
  const cursorRef = useRef(null);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    let timeout;

    const typeNextCharacter = () => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start showing content after 1 second
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    typeNextCharacter();

    return () => {
      clearTimeout(timeout);
      clearTimeout(contentTimer);
    };
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Split text into words for better wrapping
  const words = displayedText.split(" ");
  const lastWordIndex = words.length - 1;

  return (
    <section className="relative pt-16 px-6 py-20 lg:px-8 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Rotated partial background with fading corners */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 w-[150%] h-[150%]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-amber-50/20 rounded-[30%]"></div>
          <div className="absolute inset-6 bg-gradient-to-br from-blue-50/10 via-purple-50/10 to-amber-50/10 rounded-[30%]"></div>

          {/* Fading corners */}
          <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-gradient-to-br from-white to-transparent"></div>
          <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-gradient-to-bl from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-white to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-gradient-to-tl from-white to-transparent"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-amber-100/30 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-purple-100/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <FaCut className="text-blue-600 text-xl" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight min-h-[200px] md:min-h-[240px]">
              <div className="flex flex-wrap items-start">
                {words.map((word, wordIndex) => (
                  <div key={wordIndex} className="flex mr-3 mb-2">
                    {word.split("").map((char, charIndex) => (
                      <span
                        key={`${wordIndex}-${charIndex}`}
                        className={`inline-block ${
                          charIndex < 3 && wordIndex === 0
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            : "text-gray-900"
                        }`}
                        style={{
                          transition: "all 0.3s ease",
                          transform: `translateY(${isTypingComplete ? 0 : "0.5em"})`,
                          opacity: isTypingComplete ? 1 : 0.7,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
                <span
                  ref={cursorRef}
                  className={`inline-block ml-1 align-middle ${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-200`}
                  style={{ verticalAlign: "text-top" }}
                >
                  <FaCut className="text-blue-600 w-6 h-6" />
                </span>
              </div>
            </h1>

            {/* Content that appears independently of typing */}
            <div
              className={`transition-all duration-1000 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                All-in-one platform to streamline appointments, payments, staff
                coordination, and multi-location operations. Precision tools for
                professional barbers.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20">
                  Start Free Trial
                </button>
                <button className="bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-500 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 group shadow-md">
                  <span className="flex items-center">
                    Explore Features
                    <FaArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-blue-100 p-3 rounded-lg mr-3">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Appointments
                  </span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-purple-100 p-3 rounded-lg mr-3">
                    <FaUsers className="text-purple-600 text-xl" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Staff Management
                  </span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="bg-amber-100 p-3 rounded-lg mr-3">
                    <FaChartLine className="text-amber-600 text-xl" />
                  </div>
                  <span className="font-medium text-gray-800">Analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard image */}
          <div
            className={`relative transition-all duration-1000 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            {/* Floating elements container */}
            <div className="absolute -inset-6">
              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gray-200 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gray-200 rounded-br-3xl"></div>
              <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-gray-200 rounded-full"></div>
            </div>

            {/* Main image card */}
            <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white opacity-80 z-10 pointer-events-none"></div>
              <div className="relative w-full h-auto max-w-md mx-auto rounded-xl z-20">
                {/* Dashboard header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center">
                      <FaCut className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 ml-3">
                      Freshify Dashboard
                    </h3>
                  </div>
                  <div className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    Today: Aug 22, 2023
                  </div>
                </div>

                {/* Stats overview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-gray-500 text-sm mb-1">
                      Appointments
                    </div>
                    <div className="text-2xl font-bold text-gray-800">24</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="text-gray-500 text-sm mb-1">Revenue</div>
                    <div className="text-2xl font-bold text-gray-800">
                      $1,842
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <div className="text-gray-500 text-sm mb-1">Clients</div>
                    <div className="text-2xl font-bold text-gray-800">18</div>
                  </div>
                </div>

                {/* Calendar section */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">
                      Today's Schedule
                    </h4>
                    <div className="text-xs text-blue-600 font-medium">
                      View All
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          John Smith
                        </div>
                        <div className="text-sm text-gray-500">
                          10:30 AM - Haircut & Shave
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <FaCalendarAlt className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          Michael Brown
                        </div>
                        <div className="text-sm text-gray-500">
                          1:45 PM - Beard Trim
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="bg-amber-100 p-2 rounded-lg mr-3">
                        <FaCalendarAlt className="text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          David Wilson
                        </div>
                        <div className="text-sm text-gray-500">
                          3:15 PM - Full Service
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-gray-600 text-sm mb-2">Scroll to explore</span>
          <div className="w-8 h-12 rounded-full border-2 border-gray-300 flex items-start justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
