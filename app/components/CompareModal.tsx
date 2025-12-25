'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { University } from '../types/university';

interface CompareModalProps {
  universities: University[];
  onClose: () => void;
}

export default function CompareModal({ universities, onClose }: CompareModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50"
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Compare Universities</h2>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Criteria</th>
                    {universities.map((uni) => (
                      <th key={uni.id} className="text-left py-4 px-4 font-semibold text-gray-900">
                        {uni.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Country */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">Country</td>
                    {universities.map((uni) => (
                      <td key={uni.id} className="py-4 px-4 text-gray-900">
                        {uni.country}
                      </td>
                    ))}
                  </tr>

                  {/* Degree Level */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">Degree Level</td>
                    {universities.map((uni) => (
                      <td key={uni.id} className="py-4 px-4 text-gray-900">
                        {uni.degree_level}
                      </td>
                    ))}
                  </tr>

                  {/* GPA Requirement */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">Min. GPA</td>
                    {universities.map((uni) => (
                      <td key={uni.id} className="py-4 px-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {uni.min_gpa.toFixed(1)}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* IELTS Requirement */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">Min. IELTS</td>
                    {universities.map((uni) => (
                      <td key={uni.id} className="py-4 px-4">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                          {uni.min_ielts.toFixed(1)}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Tuition Fee */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700">Annual Tuition</td>
                    {universities.map((uni) => (
                      <td key={uni.id} className="py-4 px-4">
                        <span className="text-xl font-bold text-blue-600">
                          ${uni.tuition_fee.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-700 align-top">Description</td>
                    {universities.map((uni) => (
                      <td key={uni.id} className="py-4 px-4 text-sm text-gray-600">
                        {uni.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
