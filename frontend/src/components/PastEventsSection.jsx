// const PastEventsSection = () => {
//   const events = [
//     { 
//       id: 1, 
//       title: "Tech Wiz", 
//       description: "A mega-quiz competition testing participants' knowledge of the latest in technology and Google products.",
//       image: "https://placehold.co/150x150/F2CC8F/3D405B?text=Tech+Wiz",
//       color: "blue"
//     },
//     { 
//       id: 2, 
//       title: "AI Treasure Hunt", 
//       description: "An innovative event that combined problem-solving with AI-generated clues to lead teams on a thrilling campus-wide chase.",
//       image: "https://placehold.co/150x150/F2CC8F/3D405B?text=AI+Treasure+Hunt",
//       color: "green"
//     },
//     { 
//       id: 3, 
//       title: "Tormenta - An Instant Ideathon", 
//       description: "A high-energy, fast-paced event where participants developed and pitched innovative ideas in a short span of time.",
//       image: "https://placehold.co/150x150/81B29A/F8F7F4?text=Tormenta",
//       color: "yellow"
//     },
//     { 
//       id: 4, 
//       title: "Code Quest - A Hackathon", 
//       description: "Our signature hackathon that challenges developers to build creative and impactful solutions from scratch.",
//       image: "https://placehold.co/150x150/81B29A/F8F7F4?text=Code+Quest",
//       color: "red"
//     }
//   ]

//   const getColorClasses = (color) => {
//     const colors = {
//       blue: {
//         bg: 'bg-blue-100',
//         text: 'text-blue-700',
//         border: 'border-blue-200',
//         hover: 'hover:bg-blue-200'
//       },
//       green: {
//         bg: 'bg-green-100',
//         text: 'text-green-700',
//         border: 'border-green-200',
//         hover: 'hover:bg-green-200'
//       },
//       yellow: {
//         bg: 'bg-yellow-100',
//         text: 'text-yellow-700',
//         border: 'border-yellow-200',
//         hover: 'hover:bg-yellow-200'
//       },
//       red: {
//         bg: 'bg-red-100',
//         text: 'text-red-700',
//         border: 'border-red-200',
//         hover: 'hover:bg-red-200'
//       }
//     }
//     return colors[color] || colors.blue
//   }

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
//               Our Legacy of Events
//             </h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               A look back at some of our most impactful and popular events that have shaped the GDG ITER community.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//             {events.map((event, index) => {
//               const colorClasses = getColorClasses(event.color)
//               return (
//                 <div 
//                   key={event.id} 
//                   className="group bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-blue-300 cursor-pointer"
//                 >
//                   <img 
//                     src={event.image} 
//                     alt={event.title} 
//                     className="rounded-full w-28 h-28 mb-6 object-cover shadow-lg"
//                   />
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                     {event.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {event.description}
//                   </p>
//                 </div>
//               )
//             })}
//           </div>
          
//           <div className="text-center mt-16">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
//               View All Events
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default PastEventsSection
