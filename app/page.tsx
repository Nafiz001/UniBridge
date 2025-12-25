'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import TuitionSlider from './components/TuitionSlider';
import UniversityCard from './components/UniversityCard';
import CompareModal from './components/CompareModal';
import ApplyForm from './components/ApplyForm';
import { University } from './types/university';

export default function HomePage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    country: 'all',
    degreeLevel: 'all',
    tuitionMin: 0,
    tuitionMax: 60000,
    studentGPA: '',
    studentIELTS: '',
  });
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareUniversities, setCompareUniversities] = useState<University[]>([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applyUniversity, setApplyUniversity] = useState<{ id: number; name: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 10;

  // Calculate pagination
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(universities.length / universitiesPerPage);

  // Fetch universities
  const fetchUniversities = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.country !== 'all') params.append('country', filters.country);
      if (filters.degreeLevel !== 'all') params.append('degreeLevel', filters.degreeLevel);
      params.append('tuitionMin', filters.tuitionMin.toString());
      params.append('tuitionMax', filters.tuitionMax.toString());
      if (filters.studentGPA) params.append('studentGPA', filters.studentGPA);
      if (filters.studentIELTS) params.append('studentIELTS', filters.studentIELTS);

      const response = await fetch(`/api/universities?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setUniversities(data.data);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial fetch
  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  // Fetch on filter change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUniversities();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, fetchUniversities]);

  const handleSearchChange = useCallback((searchFilters: { country: string; degreeLevel: string }) => {
    setFilters((prev) => ({ ...prev, ...searchFilters }));
    setCurrentPage(1);
  }, []);

  const handleTuitionChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, tuitionMin: min, tuitionMax: max }));
    setCurrentPage(1);
  };

  const handleToggleSelect = (id: number) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCompare = async () => {
    if (selectedForCompare.length < 2 || selectedForCompare.length > 3) {
      return;
    }

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ universityIds: selectedForCompare }),
      });

      const data = await response.json();
      if (data.success) {
        setCompareUniversities(data.data);
        setShowCompareModal(true);
      }
    } catch (error) {
      console.error('Error comparing universities:', error);
    }
  };

  const handleApply = (id: number) => {
    const university = universities.find((u) => u.id === id);
    if (university) {
      setApplyUniversity({ id: university.id, name: university.name });
      setShowApplyForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearchChange} />

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Refine Your Search</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* GPA Input */}
            <div>
              <label htmlFor="gpa" className="block text-sm font-semibold text-gray-700 mb-2">
                Your GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                id="gpa"
                value={filters.studentGPA}
                onChange={(e) => setFilters((prev) => ({ ...prev, studentGPA: e.target.value }))}
                step="0.01"
                min="0"
                max="4"
                placeholder="e.g., 3.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* IELTS Input */}
            <div>
              <label htmlFor="ielts" className="block text-sm font-semibold text-gray-700 mb-2">
                Your IELTS Score (0.0 - 9.0)
              </label>
              <input
                type="number"
                id="ielts"
                value={filters.studentIELTS}
                onChange={(e) => setFilters((prev) => ({ ...prev, studentIELTS: e.target.value }))}
                step="0.5"
                min="0"
                max="9"
                placeholder="e.g., 7.0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tuition Slider */}
          <TuitionSlider onChange={handleTuitionChange} />
        </div>

        {/* Compare Button */}
        {selectedForCompare.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <button
              onClick={handleCompare}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full shadow-2xl font-semibold text-lg flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Compare ({selectedForCompare.length})
            </button>
          </motion.div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            {loading ? 'Loading...' : `${universities.length} universities found`}
          </h3>
          {universities.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Showing {indexOfFirstUniversity + 1}-{Math.min(indexOfLastUniversity, universities.length)} of {universities.length}
            </p>
          )}
          {selectedForCompare.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {selectedForCompare.length} selected for comparison (select 2-3)
            </p>
          )}
        </div>

        {/* Universities Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No universities found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUniversities.map((university) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  isSelected={selectedForCompare.includes(university.id)}
                  onToggleSelect={handleToggleSelect}
                  onApply={handleApply}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-blue-600 hover:bg-blue-50 border border-gray-300'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-blue-600 hover:bg-blue-50 border border-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Compare Modal */}
      {showCompareModal && (
        <CompareModal
          universities={compareUniversities}
          onClose={() => {
            setShowCompareModal(false);
            setSelectedForCompare([]);
          }}
        />
      )}

      {/* Apply Form */}
      {showApplyForm && applyUniversity && (
        <ApplyForm
          universityId={applyUniversity.id}
          universityName={applyUniversity.name}
          onClose={() => {
            setShowApplyForm(false);
            setApplyUniversity(null);
          }}
          onSuccess={fetchUniversities}
        />
      )}
    </div>
  );
}
