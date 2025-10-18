const Email = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-red-500 rounded-2xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
            </svg>
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4 ">
            Email Newsletter
          </h3>
          <p className=" text-lg mb-6">
            Subscribe to our newsletter for monthly updates, upcoming event
            announcements, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-xl bg-white/20 border border-white/30  placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className=" text-sm mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Email;
