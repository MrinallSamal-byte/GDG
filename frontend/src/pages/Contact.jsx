import Discord from "../features/contact/Discord";
import Email from "../features/contact/Email";
import Facebook from "../features/contact/Facebook";
import Instagram from "../features/contact/Instagram";
import WhatsApp from "../features/contact/WhatsApp";

const Contact = () => {
  return (
    <section id="contact" className="py-24 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gray-900 backdrop-blur-2xl bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl  max-w-3xl mx-auto">
              Connect with our community across different platforms. We're
              always here to help, collaborate, and grow together!
            </p>
          </div>

          {/* Social Media Sections */}
          <div className="space-y-12">
            <Discord />
            <Instagram />
            <WhatsApp />
            <Facebook />
            <Email />
          </div>

          {/* Quick Contact CTA */}
          <div className="text-center mt-20">
            <div className="home-sessions rounded-3xl p-10 shadow-2xl border border-white/20 max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Need Immediate Help?
              </h3>
              <p className="text-gray-800 mb-8 text-lg leading-relaxed">
                Our community managers are always ready to assist you. Reach out
                through any platform and we'll get back to you within 24 hours!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-3">
                  <span>Join Discord Server</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0c.14.09.28.19.42.33a10.9 10.9 0 0 1-1.71.84 12.89 12.89 0 0 0 1.08-1.78 16.39 16.39 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
                  </svg>
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-3">
                  <span>Follow on Instagram</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
