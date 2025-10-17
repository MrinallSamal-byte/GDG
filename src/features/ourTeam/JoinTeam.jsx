function JoinTeam() {
  return (
    <div className=" text-center mt-16">
      <div className="home-sessions home-margin rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Join Our Team
        </h3>
        <p className="text-gray-800 mb-6 text-lg">
          Want to be part of our amazing team? We're always looking for
          passionate individuals to help grow our community.
        </p>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-indigo-500/25">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JoinTeam
