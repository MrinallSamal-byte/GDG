import Events from "../data/FlagShip/Events";

const FlagshipProgramsSection = () => {
  return (
    <section id="flagship-programs" className="py-20 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 ">
            Flagship Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Events.map((program, index) => (
              <div
                key={index}
                className="home-sessions home-margin rounded-lg p-8  hover:shadow-lg transition-shadow duration-200"
              >
                <div className="bg-green-100 w-16 h-16  rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl  font-semibold  mb-4">
                  {program.title}
                </h3>
                <p className="">{program.description}</p>
                <button className="text-blue-600 font-semibold  hover:text-blue-800">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipProgramsSection;
