import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CalendarSection() {
  return (
    <section className=" py-20 px-4 bg-gray-50">
      <div data-aos="fade-up" className="container mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl capitalize font-bold mb-6 text-black">
              Made for modern Services scheduling
            </h2>
          </div>
          <div>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              FRESHIFY is shaped by the practices and principles that
              distinguish world-class services operations: efficient scheduling,
              seamless payments, and comprehensive business management.
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
                <div className="bg-[#F5F7FA] rounded-lg p-4 shadow-md ">
                  <img
                    src="/images/myappointment_new.png"
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
                <div className="bg-[#F5F7FA] rounded-lg p-4 shadow-md ">
                  <img
                    src="/images/setting_new.png"
                    alt="Advanced Settings Interface"
                    className="w-full h-auto "
                  />
                </div>
              ),
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-500"
            >
              <div className="mb-6  flex items-center justify-center rounded-lg overflow-hidden">
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
  );
}
