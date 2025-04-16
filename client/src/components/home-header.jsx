import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `relative px-4 py-2 text-lg font-medium transition duration-300
     ${isActive ? "text-black after:w-full" : "text-black hover:after:w-full"}
     after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-900 after:w-0 after:transition-all after:duration-300`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-16" />
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={navLinkStyle} end>HOME</NavLink>
          <NavLink to="/about" className={navLinkStyle} end>ABOUT</NavLink>
          <NavLink to="/booking" className={navLinkStyle} end>BOOKING</NavLink>
          <NavLink to="/userspace" className={navLinkStyle} end>MY STUDY SPACE</NavLink>
        </nav>

        <Link to="/register" className="hidden md:inline-block">
          <button className="bg-blue-900 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-lg transition">
            GET STARTED
          </button>
        </Link>

        <button
          className="md:hidden text-3xl text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            <NavLink to="/" className={navLinkStyle} end onClick={() => setMobileOpen(false)}>
              HOME
            </NavLink>
            <NavLink to="/about" className={navLinkStyle} end onClick={() => setMobileOpen(false)}>
              ABOUT
            </NavLink>
            <NavLink to="/booking" className={navLinkStyle} end onClick={() => setMobileOpen(false)}>
              BOOKING
            </NavLink>
            <NavLink to="/userspace" className={navLinkStyle} end onClick={() => setMobileOpen(false)}>
              MY STUDY SPACE
            </NavLink>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <button className="w-full bg-blue-900 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-lg transition">
                GET STARTED
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
