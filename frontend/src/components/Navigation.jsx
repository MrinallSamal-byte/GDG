// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// const Navigation = ({ sections, currentPage }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen)
//   }


//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMenuOpen && !event.target.closest('.navigation-container')) {
//         setIsMenuOpen(false)
//       }
//     }

//     if (isMenuOpen) {
//       document.addEventListener('mousedown', handleClickOutside)

//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//       document.body.style.overflow = 'unset'
//     }
//   }, [isMenuOpen])

//   return (
//     <>

//       {/* Backdrop overlay */}
//       <div 
//         className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
//           isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setIsMenuOpen(false)}
//       />


//       <nav className="fixed top-0 right-0 z-50 p-6 navigation-container">

//         <button
//           onClick={toggleMenu}
//           className="group w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
//         >
//           <div className="relative w-6 h-6">
//             {/* Hamburger lines */}
//             <span className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
//               isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
//             }`}></span>
//             <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
//               isMenuOpen ? 'opacity-0' : 'opacity-100'
//             }`}></span>
//             <span className={`absolute top-4 left-0 w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
//               isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
//             }`}></span>
//           </div>
//         </button>

 
//         <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out z-50 ${
//           isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}>

//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
//             <button
//               onClick={() => setIsMenuOpen(false)}
//               className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
//             >
//               <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

  
//           <div className="py-4">
//             {sections.map((section, index) => (
//               <Link
//                 key={section.id}
//                 to={section.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`w-full text-left px-6 py-4 hover:bg-blue-50 transition-all duration-300 group block transform ${
//                   currentPage === section.id 
//                     ? 'bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-500' 
//                     : 'text-gray-700 hover:text-blue-600 hover:translate-x-2'
//                 }`}
//                 style={{ 
//                   animationDelay: `${index * 100}ms`,
//                   animation: isMenuOpen ? 'slideInFromRight 0.6s ease-out forwards' : 'none'
//                 }}
//               >
//                 <span className="flex items-center gap-4">
//                   <span className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                     currentPage === section.id ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-blue-400'
//                   }`}></span>
//                   <span className="text-lg">{section.name}</span>
//                   {currentPage === section.id && (
//                     <span className="ml-auto text-blue-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
//                   )}
//                 </span>
//               </Link>
//             ))}
//           </div>

  
//           <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
//             <p className="text-sm text-gray-500 text-center">
//               GDG Web Community
//             </p>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navigation
