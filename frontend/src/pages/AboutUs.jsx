// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { Calendar, Globe, Heart, Sparkles, Target, Users } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description:
        "To bridge the gap between theory and practice by providing hands-on learning experiences and fostering innovation in technology.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Our Passion",
      description:
        "We're driven by our love for technology and our commitment to creating an inclusive space for all tech enthusiasts to learn and grow.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Community First",
      description:
        "Building a strong, supportive community where members can collaborate, share knowledge, and build meaningful connections.",
    },
  ];

  const stats = [
    { number: "500+", label: "Community Members" },
    { number: "50+", label: "Events Organized" },
    { number: "1000+", label: "Participants Reached" },
    { number: "2020", label: "Since" },
  ];

  return (
    <div className="min-h-screen home-sessions pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold  mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                GDG ITER
              </span>
            </h1>
            <p className="text-xl md:text-2xl  max-w-4xl mx-auto leading-relaxed">
              Google Developer Groups at Institute of Technical Education and
              Research - Empowering developers, fostering innovation, and
              building the future of technology together.
            </p>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-bold  mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold  mb-6">What We Do</h2>
            <p className="text-xl  max-w-3xl mx-auto">
              GDG ITER is a community-driven group that brings together
              students, developers, and tech enthusiasts to learn, share, and
              innovate with Google technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="text-blue-400 mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold  mb-4">{value.title}</h3>
                <p className=" leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold  mb-6">
              Our Activities
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Tech Workshops",
                description:
                  "Hands-on sessions on latest technologies and frameworks",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Study Jams",
                description:
                  "Collaborative learning sessions and coding challenges",
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Hackathons",
                description:
                  "Innovation challenges to solve real-world problems",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Tech Talks",
                description:
                  "Insights from industry experts and community leaders",
              },
            ].map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="home-sessions home-margin backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group hover:scale-105"
              >
                <div className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold  mb-3">{activity.title}</h3>
                <p className=" text-sm">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold  mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl  mb-8 max-w-2xl mx-auto">
              Become part of GDG ITER and embark on an exciting journey of
              learning, innovation, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600  px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Join Now
              </button>
              <button className="border border-white/30  px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
