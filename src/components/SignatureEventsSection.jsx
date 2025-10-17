// const SignatureEventsSection = () => {
//   return (
//     <section id="signature-events" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Signature Events</h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             {[
//               { 
//                 title: "GDG ITER Annual Conference", 
//                 description: "Our biggest event of the year featuring industry experts, workshops, and networking opportunities",
//                 date: "December 2024",
//                 status: "Upcoming"
//               },
//               { 
//                 title: "Google I/O Extended", 
//                 description: "Local celebration of Google I/O with live streaming, discussions, and hands-on activities",
//                 date: "May 2024",
//                 status: "Past"
//               },
//               { 
//                 title: "DevFest ITER", 
//                 description: "Developer festival showcasing the latest in technology and innovation",
//                 date: "October 2024",
//                 status: "Upcoming"
//               },
//               { 
//                 title: "Women Techmakers", 
//                 description: "Empowering women in technology through workshops, mentorship, and networking",
//                 date: "March 2024",
//                 status: "Past"
//               }
//             ].map((event, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-200">
//                 <div className="flex justify-between items-start mb-4">
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {event.status}
//                   </span>
//                   <span className="text-sm text-gray-500">{event.date}</span>
//                 </div>
//                 <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
//                 <p className="text-gray-600 mb-4">{event.description}</p>
//                 <button className="text-blue-600 font-semibold hover:text-blue-800">
//                   {event.status === 'Upcoming' ? 'Register →' : 'View Details →'}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SignatureEventsSection
