import footer from "../images/footer.jpg";

function ContactSection() {
  return (
    <section className="pt-[100px] bg-white">
      <div
        className="relative w-full h-fit py-4 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${footer})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-10 w-full max-w-[1600px] px-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-white text-left text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Have questions or need assistance? Get in touch with us, we're
              here to help!
            </h2>
          </div>

          <form className="w-full md:w-1/2 max-w-xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6 pt-6">
                <fieldset className="flex-1">
                  <label
                    htmlFor="name"
                    className="text-white font-bold block mb-2"
                  >
                    NAME*
                  </label>
                  <textarea
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 rounded border border-gray-300 text-base"
                  />
                </fieldset>
                <fieldset className="flex-1">
                  <label
                    htmlFor="email"
                    className="text-white font-bold block mb-2"
                  >
                    EMAIL*
                  </label>
                  <textarea
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 rounded border border-gray-300 text-base"
                  />
                </fieldset>
              </div>

              <fieldset>
                <label
                  htmlFor="message"
                  className="text-white font-bold block mb-2"
                >
                  MESSAGE*
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your thought"
                  className="w-full h-40 p-2 rounded border border-gray-300 text-base"
                />
              </fieldset>

              <fieldset>
                <button
                  type="submit"
                  className="w-full bg-midnightblue text-white font-bold text-xl py-4 px-6 rounded-lg hover:bg-white hover:text-midnightblue transition duration-300"
                >
                  Send Message
                </button>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
