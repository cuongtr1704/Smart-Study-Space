import logo from "../images/logo.png";
import "../styles/home-header.css";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header className="header items-center justify-center">
      <div className="Logo items-center justify-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-16 items-center justify-center"/>
        </Link>
      </div>
      <nav className="navbar">
        <div className="container">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                BOOKING
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/userspace"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
              >
                MY STUDY SPACE
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="subnav">
        <Link className="signup" to="/register">
          <button>GET STARTED</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;