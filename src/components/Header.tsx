import { Link } from "react-router-dom";
import React from "react";
export default function Header() {
  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50 h-20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">REACT-ROUTER</h1>

        <ul>
        <div className="flex space-x-6 text-white text-lg font-medium hover:text-blue-400 transition duration-300">
          <li>
            <Link
              to="/"
            >
              Home </Link>
          </li>
          <li>
            <Link
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
            >
              Contact
            </Link>
          </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
