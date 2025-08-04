import footerLogo from "../../assets/big_black_cut.png";
export default function Footer() {
  return (
    <footer className="px-6 py-16 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid " data-aos="fade-up">
          <div>
            <div className="mb-6  flex items-center justify-center">
              <img src={footerLogo} alt="FRESHIFY" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto lg:text-center mb-4 leading-relaxed">
              Complete service management solution for the modern business.
              Experience excellence in every appointment, payment, and customer
              interaction.
            </p>
          </div>
        </div>

        <div
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
          data-aos="fade-up"
        >
          <p>&copy; 2025 FRESHIFY. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
