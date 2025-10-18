import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import { firestoreService, COLLECTIONS } from "../services/firestoreService";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    signatureEvents: 0,
    pastEvents: 0,
    teamMembers: 0,
    flagshipPrograms: 0,
    workshops: 0,
    weeklyCadences: 0,
    planItems: 0,
    polls: 0,
  });

  useEffect(() => {
    // Subscribe to all collections to get counts
    const unsubscribes = [];

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.SIGNATURE_EVENTS,
        (data) => setStats((prev) => ({ ...prev, signatureEvents: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.PAST_EVENTS,
        (data) => setStats((prev) => ({ ...prev, pastEvents: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.TEAM_MEMBERS,
        (data) => setStats((prev) => ({ ...prev, teamMembers: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.FLAGSHIP_PROGRAMS,
        (data) => setStats((prev) => ({ ...prev, flagshipPrograms: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.WORKSHOPS,
        (data) => setStats((prev) => ({ ...prev, workshops: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.WEEKLY_CADENCES,
        (data) => setStats((prev) => ({ ...prev, weeklyCadences: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.PLAN_OF_ACTION,
        (data) => setStats((prev) => ({ ...prev, planItems: data.length }))
      )
    );

    unsubscribes.push(
      firestoreService.subscribeToCollection(
        COLLECTIONS.POLLS,
        (data) => setStats((prev) => ({ ...prev, polls: data.length }))
      )
    );

    return () => unsubscribes.forEach((unsub) => unsub());
  }, []);

  const sections = [
    {
      title: "Signature Events",
      count: stats.signatureEvents,
      link: "/admin/signature-events",
      icon: "🎯",
      color: "bg-blue-100 text-blue-800",
      bgColor: "bg-blue-50",
    },
    {
      title: "Past Events",
      count: stats.pastEvents,
      link: "/admin/past-events",
      icon: "📅",
      color: "bg-purple-100 text-purple-800",
      bgColor: "bg-purple-50",
    },
    {
      title: "Team Members",
      count: stats.teamMembers,
      link: "/admin/our-team",
      icon: "👥",
      color: "bg-green-100 text-green-800",
      bgColor: "bg-green-50",
    },
    {
      title: "Flagship Programs",
      count: stats.flagshipPrograms,
      link: "/admin/flagship-programs",
      icon: "🚀",
      color: "bg-orange-100 text-orange-800",
      bgColor: "bg-orange-50",
    },
    {
      title: "Workshops",
      count: stats.workshops,
      link: "/admin/workshops",
      icon: "💡",
      color: "bg-yellow-100 text-yellow-800",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Weekly Cadences",
      count: stats.weeklyCadences,
      link: "/admin/weekly-cadences",
      icon: "📆",
      color: "bg-pink-100 text-pink-800",
      bgColor: "bg-pink-50",
    },
    {
      title: "Plan of Action",
      count: stats.planItems,
      link: "/admin/plan-of-action",
      icon: "📋",
      color: "bg-indigo-100 text-indigo-800",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Polls",
      count: stats.polls,
      link: "/admin/polls",
      icon: "📊",
      color: "bg-purple-100 text-purple-800",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome! Manage your GDG website content from here.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Total Events
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.signatureEvents + stats.pastEvents}
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <span className="text-3xl">🎉</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Team Members
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.teamMembers}
                  </p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <span className="text-3xl">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Workshops
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.workshops}
                  </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <span className="text-3xl">💡</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Programs
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.flagshipPrograms}
                  </p>
                </div>
                <div className="bg-orange-100 p-4 rounded-full">
                  <span className="text-3xl">🚀</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Active Polls
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stats.polls}
                  </p>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  <span className="text-3xl">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Access
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Link
                  key={section.link}
                  to={section.link}
                  className={`${section.bgColor} rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{section.icon}</span>
                    <span
                      className={`${section.color} px-3 py-1 rounded-full text-sm font-bold`}
                    >
                      {section.count} items
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Click to manage {section.title.toLowerCase()}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">📚 Need Help?</h3>
            <p className="mb-4 text-lg">
              Check out our comprehensive documentation to get started with the admin panel.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/QUICK_START.md"
                target="_blank"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Quick Start Guide
              </a>
              <a
                href="/ADMIN_SETUP.md"
                target="_blank"
                className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition"
              >
                Setup Guide
              </a>
              <a
                href="/FIREBASE_INTEGRATION.md"
                target="_blank"
                className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition"
              >
                Integration Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
