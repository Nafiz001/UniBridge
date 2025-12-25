'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch?: (filters: { country: string; degreeLevel: string }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [country, setCountry] = useState('all');
  const [degreeLevel, setDegreeLevel] = useState('all');

  const countries = [
    'all',
    'USA',
    'UK',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Netherlands',
    'Singapore',
    'Japan',
  ];

  const degreeLevels = [
    'all',
    'Bachelor',
    'Master',
    'PhD',
  ];

  useEffect(() => {
    if (onSearch) {
      onSearch({ country, degreeLevel });
    }
  }, [country, degreeLevel]);

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country Dropdown */}
        <div>
          <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="all">All Countries</option>
            {countries.slice(1).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Degree Level Dropdown */}
        <div>
          <label htmlFor="degreeLevel" className="block text-sm font-semibold text-gray-700 mb-2">
            Degree Level
          </label>
          <select
            id="degreeLevel"
            value={degreeLevel}
            onChange={(e) => setDegreeLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="all">All Levels</option>
            {degreeLevels.slice(1).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Use the filters below to refine your search by tuition fee, GPA, and IELTS score
      </div>
    </div>
  );
}
