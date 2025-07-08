import { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaUsers, FaChartLine, FaCut } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const fullText = "FRESHIFY";
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

  return (
    <section className="relative pt-16 px-6 py-20 lg:px-8 min-h-screen flex items-center overflow-hidden bg-white">
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Rotated partial background with fading corners */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 w-[150%] h-[150%]">
          <div className="absolute inset-0 bg-grid-black/[0.05] bg-[length:40px_40px]"></div>

          {/* Fading corners */}
          <div className="absolute top-0 left-0 w-[30%] h-[30%] bg-gradient-to-br from-white via-white to-transparent"></div>
          <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-gradient-to-bl from-white via-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-white via-white to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-gradient-to-tl from-white via-white to-transparent"></div>

          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-black/[0.03] blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-black/[0.03] blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-black/[0.03] blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-black flex items-center justify-center">
              <FaScissors className="text-white text-xl" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <div className="whitespace-nowrap">
                {displayedText.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block ${
                      index < 8
                        ? "bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent"
                        : "text-gray-900"
                    }`}
                  >
                    {char}
                  </span>
                ))}
                <span
                  ref={cursorRef}
                  className={`inline-block ml-1 align-middle ${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-200`}
                  style={{ verticalAlign: "text-top" }}
                >
                  <FaCut className="text-gray-800 w-6 h-6" />
                </span>
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mt-2">
                Barbershop Management
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
              <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl">
                All-in-one platform to streamline appointments, payments, staff
                coordination, and multi-location operations. Precision tools for
                professional barbers.
              </p>

              <div className="flex gap-5 mb-12">
                <button className="bg-black text-white hover:bg-gray-900 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Get Started
                </button>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-black p-3 rounded-lg mr-3">
                    <FaCalendarAlt className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Appointments
                  </span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-gray-800 p-3 rounded-lg mr-3">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Staff Management
                  </span>
                </div>
                <div className="flex items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="bg-gray-700 p-3 rounded-lg mr-3">
                    <FaChartLine className="text-white text-xl" />
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
              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gray-300 rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gray-300 rounded-br-3xl"></div>
              <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-gray-300 rounded-full"></div>
            </div>

            {/* Main image card */}
            <div className="relative bg-white rounded-3xl p-6 border border-gray-200 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white opacity-80 z-10 pointer-events-none"></div>
              <div className="relative w-full h-auto max-w-md mx-auto rounded-xl">
                <img
                  src="/images/FRESHIFY-LOGO-02.png"
                  alt="Freshify Logo"
                  className="w-full h-auto object-contain"
                />
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
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex items-start justify-center p-1">
            <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;
