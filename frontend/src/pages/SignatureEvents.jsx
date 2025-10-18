import EventsDetails from "./../data/SignEvent/SignEvent";
import useFirestoreCollection from "../hooks/useFirestoreCollection";
import { COLLECTIONS } from "../services/firestoreService";

const SignatureEvents = () => {
  // Fetch data from Firebase (fallback to static data if empty)
  const { data: firebaseEvents, loading } = useFirestoreCollection(
    COLLECTIONS.SIGNATURE_EVENTS
  );
  
  // Use Firebase data if available, otherwise use static data
  const events = firebaseEvents.length > 0 ? firebaseEvents : EventsDetails;

  return (
    <section id="signature-events" className="py-20 home-sessions">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 ">
            Signature Events
          </h2>
          
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id || index}
                className="home-sessions home-margin rounded-lg p-8 hover:shadow-lg transition-shadow duration-200"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
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
                {event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-900 font-semibold hover:text-blue-800"
                  >
                    {event.status === "Upcoming"
                      ? "Register →"
                      : "View Details →"}
                  </a>
                ) : (
                  <button className="text-blue-900 font-semibold hover:text-blue-800">
                    {event.status === "Upcoming"
                      ? "Register →"
                      : "View Details →"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureEvents;
