import React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaDiscord, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../components/comp/themeprovider";

// First update the Logo component to remove right margin
const Logo = () => (
  <svg
    width="24" // Reduced size for footer
    height="24" // Made square for better alignment
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block" // Added for better alignment
  >
    <circle
      cx="12"
      cy="16"
      r="8"
      className="fill-[#007BFF] transition-colors duration-300"
    />
    <circle
      cx="20"
      cy="16"
      r="8"
      className="fill-[#00C853] transition-colors duration-300"
    />
  </svg>
);

const Logos = () => (
  <svg
    width="70" // Reduced size for footer
    height="64" // Made square for better alignment
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block" // Added for better alignment
  >
    <circle
      cx="12"
      cy="16"
      r="8"
      className="fill-[#007BFF] transition-colors duration-300"
    />
    <circle
      cx="20"
      cy="16"
      r="8"
      className="fill-[#00C853] transition-colors duration-300"
    />
  </svg>
);

function Footer() {
  const { darkMode } = useContext(ThemeContext);
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Find Rides", href: "/search" },
        { name: "Offer Rides", href: "/publish" },
        { name: "How it Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Documentation", href: "/docs" },
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/aboutus" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
    { icon: <FaGithub size={20} />, href: "#", label: "GitHub" },
    { icon: <FaDiscord size={20} />, href: "#", label: "Discord" },
  ];

  return (
    <footer
      className={`relative ${
        darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white border-gray-200"
      } border-t font-inter backdrop-blur-sm transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <motion.h3
                className={`text-3xl font-bold bg-gradient-to-r ${
                  darkMode
                    ? "from-blue-400 to-purple-400"
                    : "from-blue-500 to-purple-500"
                } bg-clip-text text-transparent`}
                whileHover={{ scale: 1.02 }}
              >
                <Logos />
                HolaHolaCar
              </motion.h3>
            </Link>
            <p
              className={`text-lg leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Making ride-sharing seamless, safe, and sustainable for everyone.
              Join our community today.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  } transition-colors`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3
                className={`text-sm font-semibold uppercase tracking-wider ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className={`text-base transition-colors duration-200 ${
                        darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 pt-8 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaHeart className="text-red-500" />
              </motion.span>
              <span>in Bharat</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Terms of Service
              </Link>
              <div className="flex items-center space-x-1">
                <Logo />
                <span>© {new Date().getFullYear()} HolaHolaCar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
