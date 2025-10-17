import events from "../data/PastEvent/PastEventData";
const PastEventsSection = () => {
  return (
    <section className="py-24 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
              Our Legacy of Events
            </h2>
            <p className="text-lg  max-w-3xl mx-auto">
              A look back at some of our most impactful and popular events that
              have shaped the GDG ITER community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {events.map((event) => {
              return (
                <div
                  key={event.id}
                  className="group home-sessions home-margin rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-blue-300 cursor-pointer"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-full w-28 h-28 mb-6 object-cover shadow-lg"
                  />
                  <h3 className="text-2xl font-bold  mb-4">{event.title}</h3>
                  <p className=" leading-relaxed">{event.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;
