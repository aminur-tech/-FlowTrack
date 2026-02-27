import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  Moon,
  Sun,
  ShieldCheck,
  Save,
} from "lucide-react";

const Settings = () => {
  // Simple Dark Mode State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply Dark Class to HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleThemeToggle = () => setDarkMode(!darkMode);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10 text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-400">
          Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and application appearance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT NAV */}
        <div className="space-y-1">
          <nav className="flex flex-col">
            {[
              { name: "General", icon: User },
              { name: "Security", icon: Lock },
              { name: "Notifications", icon: Bell },
              { name: "Privacy", icon: ShieldCheck },
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all
                text-gray-500 dark:text-gray-400
                hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <item.icon size={18} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">

          {/* Appearance Card */}
          <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Moon size={20} className="text-emerald-700" />
              Appearance
            </h3>

            <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-gray-700">
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Adjust the interface to reduce eye strain
                </p>
              </div>

              {/* Toggle */}
              <button
                onClick={handleThemeToggle}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                  darkMode ? "bg-emerald-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 flex items-center justify-center shadow ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                >
                  {darkMode ? (
                    <Moon size={10} className="text-emerald-600" />
                  ) : (
                    <Sun size={10} className="text-amber-500" />
                  )}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold">Language</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Set your preferred display language
                </p>
              </div>

              <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm rounded-lg px-3 py-1.5 focus:outline-none">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </section>

          {/* Profile Card */}
          <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-emerald-700" />
              Public Profile
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm outline-none"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm outline-none"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-700 flex justify-end gap-3">
              <button className="px-5 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Cancel
              </button>
              <button className="flex items-center gap-2 bg-emerald-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-950 transition-all">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;