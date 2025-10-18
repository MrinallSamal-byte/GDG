const PlanOfActionSection = () => {
  return (
    <section id="plan-of-action" className="py-20 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
              Plan of Action 2025
            </h2>
            <p className="text-lg sm:text-xl  max-w-4xl mx-auto leading-relaxed">
              To establish GDG on Campus – ITER as a vibrant, impactful, and
              officially recognized student chapter that empowers students with
              Google technologies, industry exposure, hands-on skills, and a
              thriving developer community.
            </p>
          </div>

          <div className="home-sessions rounded-2xl shadow-lg p-8 sm:p-10 mb-10 border border-gray-200 home-sessions">
            <div className="home-margin text-center mb-8 ">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center">
                <span className="text-blue-500 mr-3">📅</span> Academic Year
                Engagement Timeline
              </h3>
              <p className=" text-lg leading-relaxed max-w-3xl mx-auto">
                This interactive timeline provides a comprehensive overview of
                our planned activities for the 2025 academic year. It
                demonstrates our commitment to continuous engagement through a
                balanced mix of long-term programs, workshops, and recurring
                events.
              </p>
            </div>

            {/* Timeline Legend */}
            <div className="home-margin grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center justify-center p-3 bg-blue-100 rounded-lg border border-blue-200">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Study Jams</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Workshops</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-red-100 rounded-lg border border-red-200">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Signature Events</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-green-100 rounded-lg border border-green-200">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Community</span>
              </div>
            </div>

            {/* Timeline Details */}
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="home-margin rounded-xl p-6">
                <h4 className="text-lg font-bold  mb-3 flex items-center">
                  <span className="mr-2">🎯</span> Key Milestones
                </h4>
                <ul className="space-y-2 ">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-200 rounded-full mr-3"></span>
                    August: Launch Cloud Study Jam
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    October: AI Treasure Hunt 2.0
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    March: GDG Hackathon
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    May: Project Expo
                  </li>
                </ul>
              </div>
              <div className="home-margin rounded-xl p-6">
                <h4 className="text-lg font-bold  mb-3 flex items-center">
                  <span className="mr-2">📊</span> Expected Impact
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    500+ Student Participants
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    50+ Industry Mentors
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    100+ Projects Created
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    20+ Alumni Connections
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl font-bold  mb-4">
              Expected Outcomes
            </h3>
            <p className="text-lg sm:text-xl  max-w-3xl mx-auto leading-relaxed">
              By executing this plan, we project significant positive outcomes
              for the student community, enhancing both technical skills and
              professional networks. The following are our key targets for the
              year.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="home-sessions home-margin rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-blue-300">
              <div className="text-5xl mb-4">📈</div>
              <h4 className="font-bold text-xl  mb-3">Tech Adoption</h4>
              <p className=" leading-relaxed">
                Increased awareness & adoption of Google technologies among
                students.
              </p>
            </div>
            <div className="home-sessions home-margin rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-green-300">
              <div className="text-5xl mb-4">💡</div>
              <h4 className="font-bold text-xl  mb-3">Skill Building</h4>
              <p className=" leading-relaxed">
                Practical skill-building via workshops, projects, and
                hackathons.
              </p>
            </div>
            <div className="home-sessions home-margin rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-yellow-300">
              <div className="text-5xl mb-4">🌐</div>
              <h4 className="font-bold text-xl  mb-3">Strong Network</h4>
              <p className=" leading-relaxed">
                A robust alumni-industry-student network at ITER.
              </p>
            </div>
            <div className="home-sessions home-margin rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-red-300">
              <div className="text-5xl mb-4">🏅</div>
              <h4 className="font-bold text-xl  mb-3">Official Recognition</h4>
              <p className=" leading-relaxed">
                Recognition as a key student community contributing to
                innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanOfActionSection;
