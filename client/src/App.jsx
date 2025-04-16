import './index.css'
import clsx from "clsx";
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import About from './pages/About'
import UserSpace from './pages/UserSpace'
import Booking from './pages/Booking'
import History from './pages/History'
import Policy from './pages/Policy'
import CheckAttendance from './pages/CheckAttendance';
import UserLists from './pages/UserLists';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { IoClose } from 'react-icons/io5'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { Fragment, useRef, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { setOpenSidebar } from "./features/users/userSlice";
import { BrowserRouter, Route, Routes, useLocation, Outlet, Navigate} from 'react-router-dom'
import { useAuthRedirect } from './features/useAuthRedirect'
import { logout } from './features/users/userSlice';

export function Layout() {
  useAuthRedirect();
  const { user } = useSelector((state) => state.user)
  const location = useLocation()

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block dark:bg-gray-800"> 
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className='flex-1 overflow-y-scroll'>
        <Navbar /> 
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{from: location}} replace/>
  )
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={!!isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full dark:bg-gray-800'>
              <div className='w-full flex justify-end px-5 mt-0'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end mt-5'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#c2c5dd] to-[#b1bbdb] dark:from-[#1e1e2f] dark:to-[#252836]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/userspace" element={<UserSpace />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/history" element={<History />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/check-attendance" element={<CheckAttendance />} />
            <Route path="/user-lists" element={<UserLists />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </main>
  )
}

export default App;
