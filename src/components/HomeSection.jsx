
// import { Link } from 'react-router-dom'
// import logo from '../assets/logo2.png'

// const HomeSection = () => {
//   return (
//     <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    
//       <div className="relative">
  
//         <div className="h-96 md:h-[450px] lg:h-[500px] relative overflow-hidden">

//           <img 
//             src="/src/assets/Picture1.png" 
//             alt="GDG Background" 
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//           <div className="absolute inset-0 bg-black bg-opacity-30"></div>

//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
//             <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
//             <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
//             <div className="absolute bottom-10 right-1/3 w-20 h-20 border-2 border-white rounded-full"></div>
//           </div>


//           <div className="relative z-10 h-full flex items-center">
//             <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-40">
//               <div className="max-w-5xl">
         
//                 <div className="mb-8">
//                   <div className="inline-flex items-center gap-4 mb-8">
//                     <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg p-1">
//                       <img 
//                         src={logo} 
//                         alt="Google Developers Logo" 
//                         className="w-full h-full object-contain"
//                       />
//                     </div>
//                     <span className="text-white text-xl md:text-2xl lg:text-3xl font-medium tracking-wider uppercase">
//                       Google Developers Group
//                     </span>
//                   </div>
                  
//                   <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 text-white leading-tight">
//                     GDG <span className="font-bold text-yellow-300">ITER</span>
//                   </h1>
                  
//                   <p className="text-xl md:text-2xl text-blue-100 mb-3 font-light">
//                     Institute of Technical Education and Research
//                   </p>
//                   <div className="flex items-center gap-2 text-lg text-blue-200">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                     </svg>
//                     <span>Bhubaneswar, Odisha</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-8 md:px-12 lg:px-16 -mt-16 relative z-20">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900">Learn</h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed">
//                 Master cutting-edge technologies through hands-on workshops, expert sessions, and collaborative learning experiences.
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900">Build</h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed">
//                 Create innovative projects and solutions using Google's latest tools and technologies in a supportive environment.
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900">Connect</h3>
//               </div>
//               <p className="text-gray-600 leading-relaxed">
//                 Network with passionate developers, industry professionals, and build lasting relationships in the tech community.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="py-24 md:py-32">
//         <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-40">
//           <div className="max-w-6xl mx-auto text-center">
//             <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-900">
//               Welcome to <span className="font-semibold text-blue-600">GDG ITER</span>
//             </h2>
//             <p className="text-xl leading-relaxed text-gray-600 max-w-4xl mx-auto mb-16">
//               Empowering Developers, Building a Vibrant Community
//             </p>
//             <div className="flex flex-wrap justify-center gap-6">
//               <Link 
//                 to="/plan-of-action"
//                 className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 View Our Plan of Action
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </Link>
//               <Link 
//                 to="/our-team"
//                 className="group bg-white hover:bg-gray-50 text-gray-700 px-10 py-4 rounded-full font-medium border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Meet Our Team
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* About Us Section */}
//       <div className="py-16">
//         <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-40">
//           <div className="max-w-6xl mx-auto">
//             <div className="bg-gray-50 rounded-2xl shadow-lg p-8 sm:p-10 mb-10 border border-gray-200 hover:border-gray-300 transition-all duration-300">
//               <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
//                 <span className="text-blue-500 mr-3">About Us</span>
//               </h3>
//               <p className="text-gray-600 mb-6 text-lg leading-relaxed">
//                 At GDG on Campus ITER, we are more than just a community — we are a movement of dreamers, builders, and innovators. 
//                 Powered by Google Developers, we stand at the intersection of ideas and impact, bringing together students, 
//                 developers, and creators who dare to think beyond the ordinary.
//               </p>
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 We believe in learning by doing, growing by sharing, and leading by inspiring. From classrooms to hackathons, 
//                 from meetups to mega events — we transform curiosity into creation and passion into progress.
//               </p>
//             </div>

//             <div className="bg-gray-50 rounded-2xl shadow-lg p-8 sm:p-10 mb-10 border border-gray-200 hover:border-gray-300 transition-all duration-300">
//               <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
//                 <span className="text-green-500 mr-3">Our Work</span>
//               </h3>
//               <p className="text-gray-600 mb-6 text-lg leading-relaxed">
//                 Our work is fueled by a single mission — to empower the next generation of tech leaders. We curate Study Jams, 
//                 Workshops, Tech Talks, and Hackathons that don't just teach skills, but ignite innovation.
//               </p>
//               <p className="text-gray-600 mb-6 text-lg leading-relaxed">
//                 We collaborate, we code, we create — building solutions that matter, while shaping a community that thrives 
//                 on knowledge, creativity, and collaboration.
//               </p>
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 For us, it's not just about coding — it's about crafting a future where technology becomes the language of change.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 md:py-24">
//         <div className="container mx-auto px-12 md:px-20 lg:px-32 xl:px-40">
//           <div className="max-w-5xl mx-auto">
//             <div className="grid md:grid-cols-4 gap-8 text-center">
//               <div className="text-white">
//                 <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
//                 <div className="text-gray-300">Active Members</div>
//               </div>
//               <div className="text-white">
//                 <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
//                 <div className="text-gray-300">Events Hosted</div>
//               </div>
//               <div className="text-white">
//                 <div className="text-4xl font-bold text-yellow-400 mb-2">20+</div>
//                 <div className="text-gray-300">Workshops</div>
//               </div>
//               <div className="text-white">
//                 <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
//                 <div className="text-gray-300">Years Active</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default HomeSection