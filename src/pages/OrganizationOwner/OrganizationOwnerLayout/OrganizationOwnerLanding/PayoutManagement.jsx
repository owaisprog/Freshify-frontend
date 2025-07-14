export default function PayoutManagement() {
  return (
    <section className=" px-4 mb-6 lg:mb-12 ">
      <div className="container overflow-hidden mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2
              data-aos="fade-right"
              className="text-3xl capitalize font-bold mb-4 text-black"
            >
              Manage payouts end-to-end
            </h2>
            <p
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Integrate with Stripe for seamless payment processing. Connect
              once, then initiate payouts and manage financial transactions in
              one centralized location.
            </p>
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className="bg-[#F5F7FA] rounded-lg p-6 shadow-md   hover:shadow-xl transition-all duration-500"
            >
              <img
                src="/images/payout_new.png"
                alt="Stripe Payout Management"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          <div>
            <h2
              data-aos="fade-left"
              className="text-3xl capitalize font-bold mb-4 text-black"
            >
              Service analytics
            </h2>
            <p
              data-aos="fade-left"
              data-aos-delay="100"
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Track your most popular services and revenue streams with built-in
              analytics and reporting.
            </p>
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className="bg-[#F5F7FA] rounded-lg p-6 shadow-md  hover:shadow-xl transition-all duration-500"
            >
              <img
                src="/images/service_new.png"
                alt="Service Analytics Dashboard"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className=" rounded-lg p-8 shadow-lg border bg-white border-gray-200 transition-all duration-1000 ">
          <div className="mb-6">
            <h3
              data-aos="fade-up"
              className="text-3xl capitalize font-bold mb-4 text-black"
            >
              Comprehensive service management
            </h3>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-gray-600"
            >
              Control pricing, duration, availability, and descriptions across
              all locations
            </p>
          </div>
          <div
            data-aos="flip-left"
            data-aos-delay="200"
            className=" rounded-lg p-4"
          >
            <img
              src="/images/service_new.png"
              alt="Complete Service Management Interface"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
