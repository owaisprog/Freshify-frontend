import freshifyRoundedWhite from "../../assets/freshifyRoundedWhite.png";
import { ButtonMenu } from "./LandingPageLoginButton";
export default function LandingPageNavbar() {
  return (
    <nav className="bg-black px-4">
      <div className="flex justify-between items-center">
        {/* Logo on the left side */}
        <div className="flex items-center">
          <img
            src={freshifyRoundedWhite} // Replace with your logo image URL
            alt="Logo"
            className="w-24 h-auto" // Adjust the width as needed
          />
        </div>

        {/* Login Button on the right side */}
        <ButtonMenu />
      </div>
    </nav>
  );
}

{
  /* <ul className="font-bold text-[2rem]">
            <Link to="/Login?role=superadmin">
              <li>SuperAdmin</li>
            </Link>
            <Link to="/Login?role=customer">
              <li>Customer</li>
            </Link>
            <Link to="/Login?role=organization_owner">
              <li>Organization owner</li>
            </Link>
            <Link to="/booking">
              <li>Book Appointment</li>
            </Link>
          </ul> */
}
