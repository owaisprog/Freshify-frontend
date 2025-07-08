export default function UserAssignmentSection() {
  return (
    <section className=" px-4 py-20">
      <div className="container mx-auto overflow-hidden">
        <div className="lg:text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold capitalize mb-6 text-black"
          >
            Smart user management that scales with your business
          </h2>
          <div className="max-w-2xl mx-auto">
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-xl text-gray-600 mb-2"
            >
              <strong className="text-black">
                FRESHIFY for Organizations.
              </strong>{" "}
              Create and manage two types of users: Professionals (barbers) and
              Admins for specific locations to handle operations efficiently.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div
            data-aos="zoom-in-up"
            data-aos-delay="300"
            className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-500"
          >
            <img
              src="/images/users-management.png"
              alt="User Management System"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3
              data-aos="fade-right"
              className="text-2xl font-bold mb-4 text-black"
            >
              Professional Management
            </h3>
            <p
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-gray-600 leading-relaxed"
            >
              Track your top-performing barbers with detailed analytics. Monitor
              sales, orders, and performance metrics to optimize your teams
              productivity.
            </p>
          </div>
          <div>
            <h3
              data-aos="fade-left"
              className="text-2xl font-bold mb-4 text-black"
            >
              Admin Control System
            </h3>
            <p
              data-aos="fade-left"
              data-aos-delay="100"
              className="text-gray-600 leading-relaxed"
            >
              Assign location-specific administrators to handle day-to-day
              operations. Each admin can manage their assigned locations
              services, schedules, and customer interactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
