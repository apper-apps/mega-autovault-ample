import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No cars found", 
  message = "Try adjusting your filters or search terms to find more vehicles.",
  showCTA = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-slate/10 rounded-full p-8 mb-6">
        <ApperIcon name="Car" size={64} className="text-slate" />
      </div>
      
      <h3 className="text-2xl font-display text-charcoal mb-3">
        {title}
      </h3>
      
      <p className="text-slate mb-8 max-w-md text-lg">
        {message}
      </p>
      
      {showCTA && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" className="flex items-center gap-2">
            <ApperIcon name="Search" size={16} />
            Browse All Cars
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <ApperIcon name="Filter" size={16} />
            Clear Filters
          </Button>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl">
        <div className="p-4">
          <div className="bg-gold/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <ApperIcon name="Award" size={20} className="text-gold" />
          </div>
          <h4 className="font-semibold text-charcoal mb-1">Quality Assured</h4>
          <p className="text-sm text-slate">Every vehicle inspected and certified</p>
        </div>
        
        <div className="p-4">
          <div className="bg-success/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <ApperIcon name="DollarSign" size={20} className="text-success" />
          </div>
          <h4 className="font-semibold text-charcoal mb-1">Best Prices</h4>
          <p className="text-sm text-slate">Competitive pricing guaranteed</p>
        </div>
        
        <div className="p-4">
          <div className="bg-info/10 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <ApperIcon name="Clock" size={20} className="text-info" />
          </div>
          <h4 className="font-semibold text-charcoal mb-1">Fast Delivery</h4>
          <p className="text-sm text-slate">Quick and secure vehicle delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;