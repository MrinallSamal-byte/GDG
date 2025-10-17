import EventsDetails from "./../data/SignEvent/SignEvent";
const SignatureEvents = () => {
  return (
    <section id="signature-events" className="py-20 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 ">
            Signature Events
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {EventsDetails.map((event, index) => (
              <div
                key={index}
                className="home-sessions home-margin rounded-lg p-8 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === "Upcoming"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.status}
                  </span>
                  <span className="text-sm ">{event.date}</span>
                </div>
                <h3 className="text-2xl font-semibold  mb-4">{event.title}</h3>
                <p className=" mb-4">{event.description}</p>
                <button className="text-blue-900 font-semibold hover:text-blue-800">
                  {event.status === "Upcoming"
                    ? "Register →"
                    : "View Details →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureEvents;
