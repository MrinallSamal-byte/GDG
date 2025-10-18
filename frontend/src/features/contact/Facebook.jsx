const Facebook = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4 ">Facebook</h3>
          <p className=" text-lg mb-4">
            Like our Facebook page for event photos, community stories, and
            broader outreach to the developer ecosystem.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Visit Facebook Page
            </button>
            <span className="text-blue-700 font-bold text-lg">3.8K Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facebook;
