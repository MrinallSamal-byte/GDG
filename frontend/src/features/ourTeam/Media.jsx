import LeadTeam from "./../../data/MemberData/MediaTeam";

function Media() {
  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold  mb-4">Our Media Team</h2>
        <p className="text-lg sm:text-xl  max-w-3xl mx-auto">
          The dedicated individuals leading GDG ITER and driving our mission
          forward for 2025.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
        {LeadTeam.map((member) => (
          <div
            key={member.id}
            className="home-sessions home-margin rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-blue-300"
          >
            <div className="relative w-[220px] h-[250px] flex items-center justify-center bg-transparent">
              {/* Image inside the frame */}
              <img
                src={member.image}
                alt="Member"
                className="w-[220px] h-[250px] object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-blue-600">{member.role}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Media;
