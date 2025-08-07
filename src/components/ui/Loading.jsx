import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-elevated overflow-hidden">
          {/* Image Skeleton */}
          <div className="h-48 bg-gray-200 shimmer"></div>
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 shimmer rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 shimmer rounded-lg w-1/2"></div>
            </div>
            
            {/* Specs */}
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 shimmer rounded-lg w-20"></div>
              <div className="h-4 bg-gray-200 shimmer rounded-lg w-24"></div>
            </div>
            
            {/* Price */}
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 shimmer rounded-lg w-32"></div>
              <div className="h-4 bg-gray-200 shimmer rounded-lg w-24"></div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <div className="h-10 bg-gray-200 shimmer rounded-lg flex-1"></div>
              <div className="h-10 bg-gray-200 shimmer rounded-lg flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;