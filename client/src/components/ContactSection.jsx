import "../styles/contact-section.css";

function ContactSection() {
  return (
    <section className="Contact">
      <div className="contact-container">
        <div className="questions">
          <h2>
            Have questions or need assistance? Get in touch with us, we're here
            to help!
          </h2>
        </div>
        <div className="form">
          <div className="group">
            <fieldset>
              <label htmlFor="name">NAME*</label>
              <br />
              <textarea name="name" id="name" placeholder="Name" />
            </fieldset>
            <fieldset>
              <label htmlFor="email">EMAIL*</label>
              <br />
              <textarea name="email" id="email" placeholder="Email" />
            </fieldset>
          </div>
          <fieldset>
            <label htmlFor="message">MESSAGE*</label>
            <br />
            <textarea
              name="message"
              id="message"
              placeholder="Tell us about your thought"
            />
          </fieldset>
          <fieldset>
            <button type="submit">Send Message</button>
          </fieldset>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;