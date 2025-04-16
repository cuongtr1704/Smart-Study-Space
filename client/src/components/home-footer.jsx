import "../styles/home-footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="detail">
          <h2>Email Us</h2>
          <p>BKnetID@hcmut.edu.vn</p>
        </div>
        <div className="detail">
          <h2>Call Us</h2>
          <p>123456789</p>
        </div>
        <div className="detail">
          <h2>Address</h2>
          <p>268 Đ. Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh</p>
        </div>
      </div>
      <div className="cpr">
        <p>&copy; 2025 Smart Study Space - Group 8</p>
      </div>
    </footer>
  );
}

export default Footer;