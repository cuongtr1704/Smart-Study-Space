import Header from "../components/home-header.jsx";
import Footer from "../components/home-footer.jsx";
import ContactSection from "../components/ContactSection.jsx";
import about from "../images/about.jpg";
import logo from "../images/logo.png";
import p1 from "../images/p1.jpg";
import p2 from "../images/p2.jpg";
import p3 from "../images/p3.jpg";

function About() {
  return (
    <>
      <Header />
      <main>
        <section className="about-title relative w-full h-[60vh] bg-cover bg-center flex justify-center items-center text-white" style={{ backgroundImage: `url(${about})` }}>
          <div className="about-content text-center z-10 max-w-lg mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">About The Smart Study Space</h1>
          </div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </section>

        <section className="About bg-white py-12 px-6 sm:px-8">
          <div className="block_1 flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="about-text text-center md:text-left max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Your Perfect Study Spot, Just a Click Away</h2>
              <p className="text-xl mb-4">
                Finding a quiet and comfortable place to study can be challenging. My Study Space is designed to help students and professionals book the ideal workspace with ease. Whether you need a distraction-free environment, high-speed internet, or a cozy spot to focus, we’ve got you covered.
              </p>
            </div>
            <img src={p2} alt="Study Space p2" className="w-full sm:w-80 md:w-96 rounded-lg shadow-lg" />
          </div>

          <div className="block_2 flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            <img src={p1} alt="Study Space p1" className="w-full sm:w-80 md:w-96 rounded-lg shadow-lg" />
            <div className="about-text text-center md:text-left max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Why Choose Us?</h2>
              <ul className="text-xl space-y-4">
                <li><strong>Convenient Booking</strong> - Reserve your study space in just a few clicks.</li>
                <li><strong>Personalized Experience</strong> - Choose your preferred seating, desk type, and amenities.</li>
                <li><strong>Seamless Access</strong> - Scan your QR Code for quick check-in and hassle-free entry.</li>
                <li><strong>Modern Facilities</strong> - High-speed Wi-Fi, comfortable seating, and quiet zones.</li>
                <li><strong>Flexible Time Slots</strong> - Book for an hour, a full day, or anything in between.</li>
              </ul>
            </div>
          </div>

          <div className="block_3 flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
            <div className="about-text text-center md:text-left max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">How It Works?</h2>
              <ol className="list-decimal pl-6 text-xl space-y-4">
                <li><strong>Sign Up & Log In</strong> – Create an account and access your personalized dashboard.</li>
                <li><strong>Choose Your Space</strong> – Browse available study spots and select your preferred setup.</li>
                <li><strong>Confirm Your Booking</strong> – Receive a confirmation with your QR Code for check-in.</li>
                <li><strong>Enjoy a Focused Study Session</strong> – Arrive at your selected time and make the most of your study space.</li>
              </ol>
            </div>
            <img src={p3} alt="Study Space p3" className="w-full sm:w-80 md:w-96 rounded-lg shadow-lg" />
          </div>
        </section>

        <section className="bg-white h-full w-screen py-12 px-6 text-center">
          <div className="quote">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              At My Study Space, we believe that a well-designed environment boosts productivity. Book your spot today and elevate your study experience!
            </h2>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default About;
