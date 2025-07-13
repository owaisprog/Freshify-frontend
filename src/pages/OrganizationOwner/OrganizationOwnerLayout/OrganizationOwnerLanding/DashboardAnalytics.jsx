export default function DashboardAnalytics() {
  return (
    <section id="organization-analytics" className=" py-20   px-4 w-full  ">
      <div className="container  mx-auto ">
        <div className=" mb-6">
          <div
            data-aos="fade-up"
            className="flex w-fit items-center lg:justify-center lg:mx-auto gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-200 shadow-sm"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Analytics and Insights
          </div>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="max-w-5xl mx-auto text-4xl lg:text-center capitalize md:text-5xl font-bold mb-6 text-black"
          >
            Comprehensive dashboard for complete business oversight
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl lg:text-center text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Monitor sales performance, track top performers, analyze service
            popularity, and manage multi-location operations from a single,
            powerful dashboard.
          </p>
        </div>

        <div className="relative  mx-auto mb-16">
          <div data-aos="flip-down" data-aos-delay="300">
            <img
              src="/images/dashboard_new.png"
              alt="FRESHIFY Dashboard Analytics"
              className="w-[85%] mx-auto h-auto shadow-lg rounded-lg animation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
