'use client';

import { motion } from 'framer-motion';
import { University } from '../types/university';

interface UniversityCardProps {
  university: University;
  isSelected?: boolean;
  onToggleSelect?: (id: number) => void;
  onApply?: (id: number) => void;
}

export default function UniversityCard({
  university,
  isSelected = false,
  onToggleSelect,
  onApply,
}: UniversityCardProps) {
  const isEligible = university.is_eligible !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      } ${
        !isEligible ? 'opacity-60' : ''
      }`}
    >
      {/* Eligibility Badge */}
      {university.is_eligible !== undefined && (
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
            isEligible
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isEligible ? '✓ Eligible' : '✗ Not Eligible'}
        </div>
      )}

      {/* Compare Checkbox */}
      {onToggleSelect && (
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(university.id)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
        </div>
      )}

      <div className={onToggleSelect ? 'mt-8' : 'mt-8'}>
        {/* University Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>

        {/* Country and Degree Level */}
        <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {university.country}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            {university.degree_level}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{university.description}</p>

        {/* Requirements */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-xs text-gray-500 mb-1">Min. GPA</div>
            <div className="text-lg font-semibold text-gray-900">{university.min_gpa.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Min. IELTS</div>
            <div className="text-lg font-semibold text-gray-900">{university.min_ielts.toFixed(1)}</div>
          </div>
        </div>

        {/* Tuition Fee */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-blue-600">
            ${university.tuition_fee.toLocaleString()}
            <span className="text-sm text-gray-500 font-normal">/year</span>
          </div>
        </div>

        {/* Apply Button */}
        {onApply && (
          <button
            onClick={() => onApply(university.id)}
            disabled={!isEligible}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              isEligible
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isEligible ? 'Apply Now' : 'Not Eligible to Apply'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
