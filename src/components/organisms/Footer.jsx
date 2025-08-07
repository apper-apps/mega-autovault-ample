import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerLinks = {
    "Company": [
      { label: "About Us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Press", path: "/press" },
      { label: "Contact", path: "/contact" }
    ],
    "Services": [
      { label: "Browse Cars", path: "/" },
      { label: "Financing", path: "/financing" },
      { label: "Trade-In", path: "/trade-in" },
      { label: "Warranties", path: "/warranties" }
    ],
    "Support": [
      { label: "Help Center", path: "/help" },
      { label: "Customer Service", path: "/support" },
      { label: "Return Policy", path: "/returns" },
      { label: "Shipping Info", path: "/shipping" }
    ],
    "Legal": [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Cookie Policy", path: "/cookies" },
      { label: "Disclaimer", path: "/disclaimer" }
    ]
  };

  return (
    <footer className="bg-gradient-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-gold p-2 rounded-lg shadow-glow">
                <ApperIcon name="Car" size={24} className="text-charcoal" />
              </div>
              <span className="text-2xl font-display gradient-text">
                AutoVault
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-6">
              Your trusted partner in finding the perfect vehicle. Quality cars, transparent pricing, exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <ApperIcon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <ApperIcon name="Youtube" size={20} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display text-lg text-gold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 AutoVault. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <ApperIcon name="Shield" size={16} />
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <ApperIcon name="Truck" size={16} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <ApperIcon name="Clock" size={16} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;