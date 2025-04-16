import '../index.css';
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/users/userSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: '',
  });

  const { name, username, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/userspace");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register({ name, username, password }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="fade-in">
      <div className="w-full h-full flex items-center justify-center flex-col lg:flex-col">
        <div className="flex mt-20 mb-20 lg:mb-0 text-black dark:text-white text-2xl font-normal items-center justify-center lg:justify-end w-screen">
          <Link to="/home" className="mx-10">
            HOME
          </Link>
          <Link to="/login" className="mx-10 lg:me-80">
            LOGIN
          </Link>
        </div>

        <div className="w-full lg:w-auto flex gap-0 lg:gap-40 flex-col lg:flex-row items-center justify-center">
          <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
            <div className="w-full lg:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 lg:gap-y-10 2xl:mt-20">
              <p className="flex flex-col gap-0 lg:gap-4 text-4xl lg:text-6xl 2xl:text-7xl font-extrabold text-center text-black dark:text-white">
                <span>Smart Study Space</span>
              </p>
              <span className="flex gap-1 py-1 px-3 text-lg lg:text-2xl text-gray-600 dark:text-gray-300">
                Create your account - Please register to continue
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/3 p-4 lg:p-1 flex flex-col justify-center items-center">
            <form
              onSubmit={onSubmit}
              className="w-full lg:w-[400px] flex flex-col gap-y-4 px-10 pt-14 pb-14"
            >
              <div>
                <img
                  src={logo}
                  alt="BK TPHCM Logo"
                  className="justify-self-center text-center items-center justify-center w-24 h-24 mb-4"
                />
                <p className="font-bold text-2xl text-black dark:text-white text-center">Register</p>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="w-full flex flex-col gap-0">
                  <label className="text-left block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    className="w-full bg-white rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-0">
                  <label className="text-left block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    className="w-full bg-white rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-0">
                  <label className="text-left block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className="w-full bg-white rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="w-full flex flex-col gap-0">
                  <label className="text-left block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    className="w-full bg-white rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
              <span className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>
              </span>
              <button
                type="submit"
                className="w-full dark:bg-blue-600 dark:hover:bg-blue-800 bg-blue-900 font-semibold text-white h-10 rounded-lg hover:bg-blue-600"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
