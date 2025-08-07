import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-error/10 rounded-full p-6 mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-error" />
      </div>
      
      <h3 className="text-xl font-display text-charcoal mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate mb-6 max-w-md">
        {message}. Please try again or contact our support team if the problem persists.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button onClick={onRetry} className="flex items-center gap-2">
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
        
        <Button variant="outline" className="flex items-center gap-2">
          <ApperIcon name="MessageCircle" size={16} />
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default Error;