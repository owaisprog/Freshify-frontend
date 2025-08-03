import { FaCalendarAlt, FaCog, FaCreditCard } from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section id="organization-locations" className=" py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className=" mb-6">
          <div
            data-aos="fade-up"
            className="flex w-fit items-center lg:justify-center lg:mx-auto gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 shadow-sm"
          >
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Multi-location workflows
          </div>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="max-w-5xl mx-auto text-4xl lg:text-center capitalize md:text-5xl font-bold mb-6 text-black"
          >
            Collaborate across locations and teams
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl lg:text-center text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Expand your service operations with a comprehensive location
            management system that ensures all your branches stay aligned and
            well-coordinated.
          </p>
        </div>
        <div className="relative mb-16">
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className=" animation  rounded-lg p-4   transition-all duration-500"
          >
            <img
              src="/images/location_new.png"
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
              description: "Customize descriptions and details for each branch",
              icon: <FaCog className="w-6 h-6" />,
            },
          ].map((item, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={item.title}
              className="text-left shadow-md rounded-xl   p-4"
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
  );
}
