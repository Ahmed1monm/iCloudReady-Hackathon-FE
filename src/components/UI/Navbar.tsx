import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">Hackathon</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="text-white hover:text-gray-400">Dashboard</Link>
          </li>
          <li>
            <Link to="/campaigns" className="text-white hover:text-gray-400">Campaigns</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}