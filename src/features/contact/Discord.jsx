const Discord = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0c.14.09.28.19.42.33a10.9 10.9 0 0 1-1.71.84 12.89 12.89 0 0 0 1.08-1.78 16.39 16.39 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4 ">
            Discord Community
          </h3>
          <p className=" text-lg mb-4">
            Join our active Discord server for real-time discussions, Q&A
            sessions, and instant support from fellow developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Join Server
            </button>
            <button className="bg-white/20 hover:bg-white/30  px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              View Channels
            </button>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">
            Live: 250+ Online
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discord;
