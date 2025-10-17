import Events from "../data/WorkShop/Events";
const WorkshopsSection = () => {
  return (
    <section id="workshops" className="py-20 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 ">Workshops</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Events.map((workshop, index) => (
              <div
                key={index}
                className="home-sessions home-margin rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {workshop.level}
                  </span>
                  <span className="text-sm\">{workshop.date}</span>
                </div>
                <h3 className="text-xl  font-semibold mb-2">
                  {workshop.title}
                </h3>
                <button className="text-blue-600 font-semibold hover:text-blue-800">
                  Register →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopsSection;
