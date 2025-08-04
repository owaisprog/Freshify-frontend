import { FaStar } from "react-icons/fa";

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="bg-gray-100 px-4 sm:px-6 py-12 sm:py-24 relative overflow-hidden floating-shapes"
    >
      <div className="container mx-auto relative z-10">
        <h2
          className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8"
          data-aos="fade-up"
        >
          Reviews
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4">
          {[
            {
              title: "The best booking system",
              text: "Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!",
              author: "Lucy",
              location: "London, UK",
            },
            {
              title: "Easy to use & explore",
              text: "Freshify's reminders make life so much easier. I also found a few good barbershops that I didn't know existed.",
              author: "Dan",
              location: "New York, USA",
            },
            {
              title: "Great for finding barbers",
              text: "I've been using Freshify for two years and it's by far the best booking platform I've used. Highly recommend it!",
              author: "Dale",
              location: "Sydney, Australia",
            },
            {
              title: "My go-to for self-care",
              text: "Freshify is my go-to app for massages and facials. I can easily find and book places near me — I love it!",
              author: "Cameron",
              location: "Edinburgh, UK",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex mb-3 sm:mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="orange" />
                ))}
              </div>
              <h3 className="font-semibold text-black mb-2 sm:mb-3 text-sm sm:text-base">
                {review.title}
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {review.text}
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-200 to-pink-400 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-black text-sm sm:text-base">
                    {review.author}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
