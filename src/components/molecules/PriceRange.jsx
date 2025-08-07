import React from "react";
import Label from "@/components/atoms/Label";

const PriceRange = ({ min, max, value, onChange, step = 1000 }) => {
  return (
    <div className="space-y-4">
      <Label>Price Range</Label>
      <div className="space-y-3">
        <div>
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            step={step}
            onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            step={step}
            onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb mt-1"
          />
        </div>
        <div className="flex justify-between text-sm text-slate font-medium">
          <span>${value[0].toLocaleString()}</span>
          <span>${value[1].toLocaleString()}</span>
        </div>
      </div>
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(243, 156, 18, 0.3);
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(243, 156, 18, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PriceRange;