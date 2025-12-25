'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ApplyFormProps {
  universityId: number;
  universityName: string;
  onClose: () => void;
  onSuccess?: () => void;
  studentGPA?: string;
  studentIELTS?: string;
}

interface FormData {
  student_name: string;
  email: string;
  phone: string;
  gpa: string;
  ielts: string;
}

export default function ApplyForm({
  universityId,
  universityName,
  onClose,
  onSuccess,
  studentGPA = '',
  studentIELTS = '',
}: ApplyFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    student_name: '',
    email: '',
    phone: '',
    gpa: studentGPA,
    ielts: studentIELTS,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleNextStep = () => {
    // Validate step 1
    if (step === 1) {
      if (!formData.student_name.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!formData.phone.trim() || !/^[\d+\-\s()]+$/.test(formData.phone)) {
        setError('Please enter a valid phone number');
        return;
      }
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate step 2
    const gpaNum = parseFloat(formData.gpa);
    const ieltsNum = parseFloat(formData.ielts);

    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError('Please enter a valid GPA between 0 and 4.0');
      return;
    }

    if (isNaN(ieltsNum) || ieltsNum < 0 || ieltsNum > 9.0) {
      setError('Please enter a valid IELTS score between 0 and 9.0');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          university_id: universityId,
          student_name: formData.student_name,
          email: formData.email,
          phone: formData.phone,
          gpa: gpaNum,
          ielts: ieltsNum,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit application');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Close modal after 2 seconds
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
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
          className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 md:p-8"
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

          {/* Success Message */}
          {success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600">We&apos;ll contact you shortly at {formData.email}</p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply to {universityName}</h2>
                <p className="text-gray-600">Complete the form below to submit your application</p>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    1
                  </div>
                  <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    2
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="student_name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="student_name"
                        name="student_name"
                        value={formData.student_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Academic Info */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="gpa" className="block text-sm font-semibold text-gray-700 mb-2">
                        GPA (0.0 - 4.0) *
                      </label>
                      <input
                        type="number"
                        id="gpa"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleChange}                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}                        step="0.01"
                        min="0"
                        max="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.5"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="ielts" className="block text-sm font-semibold text-gray-700 mb-2">
                        IELTS Score (0.0 - 9.0) *
                      </label>
                      <input
                        type="number"
                        id="ielts"
                        name="ielts"
                        value={formData.ielts}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                        step="0.5"
                        min="0"
                        max="9"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="7.0"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-between gap-4">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  )}

                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="ml-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="ml-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
