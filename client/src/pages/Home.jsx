import Header from "../components/home-header.jsx";
import Footer from "../components/home-footer.jsx";
import ContactSection from "../components/ContactSection.jsx";
import homepageImg from "../images/homepage.png";
import bookIcon from "../images/proicons--book.svg";
import wifiIcon from "../images/material-symbols--wifi.svg";
import library from "../images/library.jpg";
import chairIcon from "../images/material-symbols-light--chair-alt-outline.svg";
import clockIcon from "../images/mdi-light--clock.svg";
import handshakeIcon from "../images/material-symbols-light--handshake-outline-rounded.svg";

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="home-title relative w-full h-[60vh] bg-cover bg-center text-white flex justify-center items-center" style={{ backgroundImage: `url(${library})` }}>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="z-10 text-center p-6">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">Study Smart Book a Spot!</h1>
            <p className="text-lg lg:text-2xl mb-6">
              Need a quiet and comfortable place to study? Reserve your spot now and enjoy a distraction-free environment designed for productivity.
            </p>
            <a href="/booking">
              <button className="bg-midnightblue text-white py-3 px-6 rounded-lg text-xl font-bold hover:bg-white hover:text-midnightblue transition duration-300">
                Book Now
              </button>
            </a>
          </div>
        </section>

        <section className="home-bullet py-10 bg-gray-100 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-10">Why Choose Smart Study Space?</h2>
          <div className="home-container-2 max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <div className="block text-left">
              <img src={bookIcon} alt="Book Icon" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Distraction-Free Environment</h3>
              <p className="text-gray-600">A quiet space that helps you focus entirely on studying without interruptions.</p>
            </div>
            <div className="block text-left">
              <img src={wifiIcon} alt="Wifi Icon" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">High-Speed Internet</h3>
              <p className="text-gray-600">Fast and stable internet connection, perfect for online research and remote learning.</p>
            </div>
            <div className="block text-left">
              <img src={chairIcon} alt="Chair Icon" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Comfortable & Modern Setup</h3>
              <p className="text-gray-600">Ergonomic chairs, proper lighting, and spacious desks for a comfortable study experience.</p>
            </div>
            <div className="block text-left">
              <img src={clockIcon} alt="Clock Icon" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Flexible Booking Options</h3>
              <p className="text-gray-600">Easy booking with flexible time slots to fit your schedule.</p>
            </div>
            <div className="block text-left">
              <img src={handshakeIcon} alt="Handshake Icon" className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Community & Collaboration</h3>
              <p className="text-gray-600">Connect with fellow learners, exchange knowledge, and grow together.</p>
            </div>
          </div>
        </section>

        <section className="About py-10 bg-white">
          <div className="home-container-3 max-w-screen-lg mx-auto flex flex-col lg:flex-row items-center gap-10 px-4">
            <img src={homepageImg} alt="Smart Study Space" className="w-full lg:w-1/2 rounded-xl shadow-lg" />
            <div className="home-text text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">About Smart Study Space</h2>
              <p className="text-lg mb-4">
                Need a quiet and comfy place to focus? Our study spaces are designed to minimize distractions, helping you stay productive and make the most of your study time.
              </p>
              <p className="text-lg mb-6">
                With high-speed internet, ergonomic seating, and a calm atmosphere, our spaces provide the perfect setting for deep focus. Book your spot today and elevate your study experience!
              </p>
              <a href="/about">
                <button className="bg-midnightblue text-white py-3 px-6 rounded-lg text-xl font-bold hover:bg-white hover:text-midnightblue transition duration-300">
                  About Us
                </button>
              </a>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default Home;
