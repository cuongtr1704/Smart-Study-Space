import Header from "../components/home-header.jsx";
import Footer from "../components/home-footer.jsx";
import ContactSection from "../components/ContactSection.jsx";
import "../styles/Home.css";
import homepageImg from "../images/homepage.png";
import bookIcon from "../images/proicons--book.svg";
import wifiIcon from "../images/material-symbols--wifi.svg";
import chairIcon from "../images/material-symbols-light--chair-alt-outline.svg";
import clockIcon from "../images/mdi-light--clock.svg";
import handshakeIcon from "../images/material-symbols-light--handshake-outline-rounded.svg";

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="home-title">
          <div className="home-container-1">
            <div className="home-content">
              <h1>Study Smart Book a Spot!</h1>
              <p>
                Need a quiet and comfortable place to study? Reserve your spot
                now and enjoy a distraction-free environment designed for
                productivity.
              </p>
              <a href="/booking">
                <button>Book Now</button>
              </a>
            </div>
          </div>
        </section>

        <section className="home-bullet">
          <h2>Why Choose Smart Study Space?</h2>
          <div className="home-container-2">
            <div className="block">
              <img src={bookIcon} alt="" />
              <h3>Distraction-Free Environment</h3>
              <p>
                A quiet space that helps you focus entirely on studying without
                interruptions.
              </p>
            </div>
            <div className="block">
              <img src={wifiIcon} alt="" />
              <h3>High-Speed Internet</h3>
              <p>
                Fast and stable internet connection, perfect for online research
                and remote learning.
              </p>
            </div>
            <div className="block">
              <img src={chairIcon} alt="" />
              <h3>Comfortable & Modern Setup</h3>
              <p>
                Ergonomic chairs, proper lighting, and spacious desks for a
                comfortable study experience.
              </p>
            </div>
            <div className="block">
              <img src={clockIcon} alt="" />
              <h3>Flexible Booking Options</h3>
              <p>Easy booking with flexible time slots to fit your schedule.</p>
            </div>
            <div className="block">
              <img src={handshakeIcon} alt="" />
              <h3>Community & Collaboration</h3>
              <p>
                Connect with fellow learners, exchange knowledge, and grow
                together.
              </p>
            </div>
          </div>
        </section>

        <section className="About">
          <div className="home-container-3">
            <img src={homepageImg} alt="" />
            <div className="home-text">
              <h2>About Smart Study Space</h2>
              <p>
                Need a quiet and comfy place to focus? Our study spaces are
                designed to minimize distractions, helping you stay productive
                and make the most of your study time.
              </p>
              <p>
                With high-speed internet, ergonomic seating, and a calm
                atmosphere, our spaces provide the perfect setting for deep
                focus. Book your spot today and elevate your study experience!
              </p>
              <a href="/about">
                <button>About Us</button>
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