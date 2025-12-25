'use client';

import { useState } from 'react';

interface TuitionSliderProps {
  min?: number;
  max?: number;
  onChange: (min: number, max: number) => void;
}

export default function TuitionSlider({ 
  min = 0, 
  max = 60000, 
  onChange 
}: TuitionSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxValue) {
      setMinValue(value);
      onChange(value, maxValue);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minValue) {
      setMaxValue(value);
      onChange(minValue, value);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-gray-700">Tuition Fee Range</label>
        <div className="text-sm font-medium text-blue-600">
          {formatCurrency(minValue)} - {formatCurrency(maxValue)}
        </div>
      </div>

      <div className="relative pt-6 pb-2">
        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none z-10"
          style={{
            background: 'transparent',
          }}
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none pointer-events-none z-10"
          style={{
            background: 'transparent',
          }}
        />

        {/* Track */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{
              left: `${(minValue / max) * 100}%`,
              right: `${100 - (maxValue / max) * 100}%`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        input[type='range']::-moz-range-thumb {
          pointer-events: all;
          width: 20px;
          height: 20px;
          background-color: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
