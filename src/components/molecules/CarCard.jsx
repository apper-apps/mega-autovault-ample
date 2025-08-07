import React from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const CarCard = ({ car, onViewDetails, onAddToCart }) => {
  const originalPrice = car.price + Math.floor(car.price * 0.15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="premium-card rounded-xl overflow-hidden shadow-elevated hover:shadow-premium group cursor-pointer"
      onClick={() => onViewDetails(car.Id)}
    >
      <div className="relative overflow-hidden">
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <Badge variant={car.inStock ? "success" : "error"}>
            {car.inStock ? "In Stock" : "Sold Out"}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="gold">{car.type}</Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-display text-charcoal mb-1">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-slate text-sm">{car.color} • {car.mileage.toLocaleString()} miles</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate">
          <div className="flex items-center gap-1">
            <ApperIcon name="Zap" size={16} />
            <span>{car.engine}</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Settings" size={16} />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-crimson">
              ${car.price.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 line-through price-strike">
              ${originalPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-success font-medium">
            Save ${(originalPrice - car.price).toLocaleString()}
          </div>
        </div>

        <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(car.Id)}
          >
            <ApperIcon name="Eye" size={16} />
            View Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onAddToCart(car)}
            disabled={!car.inStock}
          >
            <ApperIcon name="ShoppingCart" size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;