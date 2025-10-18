const CommunityImpact = () => {
  return (
    <section
      id="community-impact"
      className="py-24 relative overflow-hidden home-sessions"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gray-700 bg-clip-text text-transparent">
              Community & Impact
            </h2>
            <p className="text-xl text-gray-900 max-w-3xl mx-auto">
              Building a thriving ecosystem of developers and innovators at ITER
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group text-center bg-indigo-200/100 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">👥</span>
              </div>
              <div className="text-5xl font-black mb-3 bg-gray-800 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-lg text-gray-900 font-semibold">
                Active Members
              </div>
            </div>
            <div className="group text-center bg-indigo-200/100 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🎉</span>
              </div>
              <div className="text-5xl font-black mb-3 bg-gray-800 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-lg text-gray-900 font-semibold">
                Events Organized
              </div>
            </div>
            <div className="group text-center bg-indigo-200/100 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌟</span>
              </div>
              <div className="text-5xl font-black mb-3 bg-gray-800 bg-clip-text text-transparent">
                1000+
              </div>
              <div className="text-lg text-gray-900 font-semibold">
                Students Impacted
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-200/100 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gray-800 bg-clip-text text-transparent">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-gray-900">
                To create a vibrant community of developers and tech enthusiasts
                at ITER, fostering innovation, learning, and collaboration
                through Google technologies and modern development practices.
              </p>
            </div>
            <div className="bg-indigo-200/100 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gray-800 bg-clip-text text-transparent">
                Get Involved
              </h3>
              <p className="text-lg leading-relaxed mb-6 text-gray-900">
                Join our community and be part of the tech revolution at ITER.
                Whether you're a beginner or an expert, there's a place for you
                here.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group bg-white text-emerald-600 px-6 py-3 rounded-2xl font-bold hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span className="flex items-center gap-2">
                    Join Discord
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
                <button className="group border-2 border-white/50 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/10 hover:border-white transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    Follow Us
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
