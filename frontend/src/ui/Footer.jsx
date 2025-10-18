import { Link } from "react-router-dom";
import { MapPin, ExternalLink, Heart } from "lucide-react";
import logo from "./../assets/logo2.png";

const Footer = () => {
  const quickLinks = [
    { name: "Past Events", path: "/past-events" },
    { name: "Our Team", path: "/our-team" },
    { name: "Workshops", path: "/workshops" },
    { name: "Community & Impact", path: "/community-impact" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Discord",
      icon: "D",
      url: "#",
      color: "bg-purple-500 hover:bg-purple-600",
      label: "D",
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: "#",
      color: "bg-blue-600 hover:bg-blue-700",
      label: "in",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "#",
      color: "bg-sky-400 hover:bg-sky-500",
      label: "🐦",
    },
    {
      name: "GitHub",
      icon: "⚡",
      url: "#",
      color: "bg-gray-700 hover:bg-gray-800",
      label: "⚡",
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Code of Conduct", path: "/conduct" },
  ];

  return (
    <footer className="bg-gradient-to-b from-indigo-100 to-gray-100 border-t border-gray-200/50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center p-2 shadow-lg">
                  <img
                    src={logo}
                    alt="GDG ITER Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GDG ITER
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    Google Developer Groups
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600 leading-relaxed">
                  Institute of Technical Education and Research
                  <br />
                  Bhubaneswar, Odisha 751030
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                Building the future of technology, one developer at a time
                through community, innovation, and collaboration.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
              </h4>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center group text-gray-600 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
                Resources
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
              </h4>
              <div className="space-y-3">
                {[
                  "Learning Materials",
                  "Event Recordings",
                  "Project Templates",
                  "Developer Tools",
                  "Documentation",
                ].map((resource) => (
                  <a
                    key={resource}
                    href="#"
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1"
                  >
                    {resource}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
                Connect With Us
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
              </h4>

              <div className="flex space-x-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-12 h-12 ${social.color} rounded-2xl flex items-center justify-center text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg group relative`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {social.label}
                    </span>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Follow us for the latest updates, events, and tech insights.
              </p>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  💡 <strong>Next Event:</strong> Workshop on Cloud Computing
                  <br />
                  <span className="text-xs text-gray-500">
                    December 15, 2025
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200/60 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-600">
                <span>© 2025 GDG ITER. All rights reserved.</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center space-x-6 text-sm">
                {legalLinks.map((link) => (
                  <a
                    key={link.path}
                    href={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>

              {/* Made with love */}
              <div className="text-gray-500 text-sm flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>by GDG ITER Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
