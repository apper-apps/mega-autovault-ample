import React from "react";
import Button from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import PriceRange from "@/components/molecules/PriceRange";
import ApperIcon from "@/components/ApperIcon";
import { motion, AnimatePresence } from "framer-motion";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  cars = [] 
}) => {
  const makes = [...new Set(cars.map(car => car.make))].sort();
  const types = [...new Set(cars.map(car => car.type))].sort();
  const transmissions = [...new Set(cars.map(car => car.transmission))].sort();

  const handleMakeChange = (make) => {
    const newMakes = filters.makes.includes(make)
      ? filters.makes.filter(m => m !== make)
      : [...filters.makes, make];
    onFiltersChange({ ...filters, makes: newMakes });
  };

  const handleTypeChange = (type) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleTransmissionChange = (transmission) => {
    const newTransmissions = filters.transmission.includes(transmission)
      ? filters.transmission.filter(t => t !== transmission)
      : [...filters.transmission, transmission];
    onFiltersChange({ ...filters, transmission: newTransmissions });
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display text-charcoal">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-crimson hover:bg-crimson/10"
        >
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <PriceRange
        min={15000}
        max={150000}
        value={filters.priceRange}
        onChange={(range) => onFiltersChange({ ...filters, priceRange: range })}
      />

      {/* Make Filter */}
      <div className="space-y-3">
        <Label>Make</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {makes.map((make) => (
            <label key={make} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.makes.includes(make)}
                onChange={() => handleMakeChange(make)}
                className="rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span className="text-sm text-charcoal">{make}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="space-y-3">
        <Label>Type</Label>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span className="text-sm text-charcoal">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="space-y-3">
        <Label>Transmission</Label>
        <div className="space-y-2">
          {transmissions.map((transmission) => (
            <label key={transmission} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.transmission.includes(transmission)}
                onChange={() => handleTransmissionChange(transmission)}
                className="rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span className="text-sm text-charcoal">{transmission}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar
  if (!isOpen && window.innerWidth >= 1024) {
    return (
      <div className="hidden lg:block w-80 bg-white rounded-xl shadow-elevated p-6 h-fit sticky top-24">
        {sidebarContent}
      </div>
    );
  }

  // Mobile Overlay
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-premium z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display text-charcoal">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
              {sidebarContent}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;