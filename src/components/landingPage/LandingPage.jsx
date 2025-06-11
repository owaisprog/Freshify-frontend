import LandingPageNavbar from "./LandingPageNavbar";
// import freshifyImage from "../../assets/freshifyImage.png";
import OwnerCards from "./OwnerCardPage";
// import {
//   Calendar,
//   CreditCard,
//   Mail,
//   Phone,
//   Scissors,
//   Star,
//   TrendingUp,
//   Users,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export default function LandingPage() {
  return (
    <section>
      <LandingPageNavbar />

      {/* Hero Section */}
      {/* <section
        className="relative py-20 lg:py-32 min-h-[600px] lg:min-h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${freshifyImage})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-white leading-tight">
                  Professional Barbershop Management Platform
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  Streamline your barbershop operations with our comprehensive
                  platform. Manage appointments, handle payments, and grow your
                  business efficiently.
                </p>
              </div>

              <button className="px-8 py-4 bg-white text-black hover:bg-black border border-white cursor-pointer hover:text-white rounded-lg font-semibold text-lg duration-300 transition-all shadow-lg">
                Get Started
              </button>

              <div className="flex flex-wrap justify-between gap-8 pt-8 max-w-xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    100%
                  </div>
                  <div className="text-gray-200 font-medium">Trusted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    24/7
                  </div>
                  <div className="text-gray-200 font-medium">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-200 font-medium">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
      </section> */}

      {/* Owner Cards Section  */}
      <OwnerCards />

      {/* Features Section */}
      {/* <section id="features" className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-3xl lg:text-6xl font-bold  leading-tight text-white">
              Complete Business Solution
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Everything you need to manage your barbershop professionally and
              efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-black">
                Appointment Management
              </h3>
              <p className="text-gray-600 text-sm">
                Efficient booking system with real-time availability and
                automated confirmations.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <CreditCard className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-black">
                Payment Processing
              </h3>
              <p className="text-gray-600 text-sm">
                Secure payment handling with multiple payment options and
                financial reporting.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-black">
                Staff Management
              </h3>
              <p className="text-gray-600 text-sm">
                Manage your team with role-based access and performance
                tracking.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-lg font-semibold text-black">
                Business Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Detailed insights and reports to help grow your business
                effectively.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      {/* <section id="how-it-works" className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-3xl lg:text-6xl  leading-tight font-bold text-white">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Simple steps to get your perfect haircut
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Find Barbershops
              </h3>
              <p className="text-gray-200">
                Browse local barbershops, check services, and read reviews from
                other customers.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Book Appointment
              </h3>
              <p className="text-gray-200">
                Select your preferred service, choose a time slot, and book your
                appointment instantly.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Enjoy Service
              </h3>
              <p className="text-gray-200">
                Arrive at your scheduled time and enjoy professional barbershop
                services.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-black leading-tight">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Trusted by barbershop owners and customers nationwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <p className="text-gray-600">
                Freshify has streamlined our entire booking process. Our
                customers love the convenience and wevdve seen a significant
                increase in appointments.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">MJ</span>
                </div>
                <div>
                  <p className="font-medium text-black">Mike Johnson</p>
                  <p className="text-sm text-gray-500">Barbershop Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <p className="text-gray-600">
                Booking appointments online is so convenient. I can see
                available times and book instantly without having to call during
                business hours.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">SD</span>
                </div>
                <div>
                  <p className="font-medium text-black">Sarah Davis</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <p className="text-gray-600">
                The payment system and reporting features have made managing our
                business much easier. Highly recommend to other shop owners.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">AL</span>
                </div>
                <div>
                  <p className="font-medium text-black">Alex Lopez</p>
                  <p className="text-sm text-gray-500">Shop Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-3xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Join thousands of barbershops using Freshify to manage their
              business efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-black hover:bg-gray-100 rounded-md font-medium transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black rounded-md font-medium transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-semibold">Freshify</span>
              </div>
              <p className="text-gray-400">
                Professional barbershop management platform trusted by
                businesses nationwide.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <BsFacebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <BsTwitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <BsInstagram className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white text-sm"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white text-sm"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white text-sm"
                >
                  API
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white text-sm"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>support@freshify.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Freshify. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </section>
  );
}
