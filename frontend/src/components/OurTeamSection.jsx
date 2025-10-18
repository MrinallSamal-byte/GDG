// const OurTeamSection = () => {
//   const teamMembers = [
//     { id: 1, name: "Mohammad Faiz", role: "Chapter Lead", image: "IMG_20250825_200649.jpg" },
//     { id: 2, name: "Harsh Singh", role: "PR and Management", image: "DSC00715.JPG" },
//     { id: 3, name: "Bhabesh Behera", role: "Technical Lead", image: "IMG_20250615_2118501.jpg" },
//     { id: 4, name: "Mansa Siddhi", role: "Media Lead", image: "DSC04821.JPG" },
//     { id: 5, name: "Pavan Ranjan", role: "Design Lead", image: "DSC_010.JPG" }
//   ]

//   return (
//     <section id="our-team" className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
//       <div className="container mx-auto px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//               Meet Our Team
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
//               The dedicated individuals leading GDG ITER and driving our mission forward for 2025.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
//             {teamMembers.map((member, index) => (
//               <div 
//                 key={member.id} 
//                 className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-200 hover:border-blue-300"
//               >
//                 <img 
//                   src={member.image} 
//                   alt={member.name}
//                   className="rounded-full w-28 h-28 mb-6 object-cover shadow-lg"
//                 />
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {member.name}
//                 </h3>
//                 <p className="text-sm font-medium text-blue-600">
//                   {member.role}
//                 </p>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-16">
//             <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
//               <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Join Our Team
//               </h3>
//               <p className="text-gray-600 mb-6 text-lg">
//                 Want to be part of our amazing team? We're always looking for passionate individuals to help grow our community.
//               </p>
//               <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-indigo-500/25">
//                 Apply Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default OurTeamSection
