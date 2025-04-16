import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-4 py-10 bg-[#090b40] text-white text-center md:text-left">
        <div className="w-72">
          <h2 className="text-lg font-medium mb-4">Email Us</h2>
          <p className="text-lg font-bold">BKnetID@hcmut.edu.vn</p>
        </div>
        <div className="w-72">
          <h2 className="text-lg font-medium mb-4">Call Us</h2>
          <p className="text-lg font-bold">123456789</p>
        </div>
        <div className="w-72">
          <h2 className="text-lg font-medium mb-4">Address</h2>
          <p className="text-lg font-bold">
            268 Đ. Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
          </p>
        </div>
      </div>

      <div className="bg-[#060826] text-white text-lg font-bold h-28 flex items-center justify-start pl-10 md:pl-80">
        <p>&copy; 2025 Smart Study Space - Group 8</p>
      </div>
    </footer>
  );
}

export default Footer;
