import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { carService } from "@/services/api/carService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CarDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [financeAmount, setFinanceAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);

  const loadCar = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = await carService.getById(parseInt(id));
      setCar(data);
      setFinanceAmount(data.price);
      setDownPayment(Math.floor(data.price * 0.2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCar();
  }, [id]);

  useEffect(() => {
    if (car) {
      setFinanceAmount(car.price - downPayment);
    }
  }, [car, downPayment]);

  const handleAddToCart = () => {
    onAddToCart(car);
    toast.success(`${car.make} ${car.model} added to cart!`);
  };

  const calculateMonthlyPayment = () => {
    const principal = financeAmount;
    const interestRate = 0.05 / 12; // 5% annual rate
    const payments = loanTerm;
    
    if (principal <= 0) return 0;
    
    const monthlyPayment = principal * 
      (interestRate * Math.pow(1 + interestRate, payments)) / 
      (Math.pow(1 + interestRate, payments) - 1);
    
    return monthlyPayment;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-96 bg-gray-200 shimmer rounded-xl"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 shimmer rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 shimmer rounded-lg w-3/4"></div>
              <div className="h-12 bg-gray-200 shimmer rounded-lg w-1/2"></div>
              <div className="h-32 bg-gray-200 shimmer rounded-xl"></div>
              <div className="h-48 bg-gray-200 shimmer rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadCar} />
        </div>
      </div>
    );
  }

  if (!car) return null;

  const originalPrice = car.price + Math.floor(car.price * 0.15);
  const monthlyPayment = calculateMonthlyPayment();

  return (
    <div className="min-h-screen bg-pearl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" size={20} />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={car.images[selectedImageIndex]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant={car.inStock ? "success" : "error"}>
                  {car.inStock ? "In Stock" : "Sold Out"}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="gold">{car.type}</Badge>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {car.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? "border-gold shadow-glow"
                      : "border-transparent hover:border-gold/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Car Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl font-display text-charcoal mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              <div className="flex items-center gap-4 text-slate">
                <span>{car.color}</span>
                <span>•</span>
                <span>{car.mileage.toLocaleString()} miles</span>
                <span>•</span>
                <span>VIN: {car.Id.toString().padStart(8, "0")}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-elevated">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-crimson">
                  ${car.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-success font-medium text-lg">
                Save ${(originalPrice - car.price).toLocaleString()}
              </div>
            </div>

            {/* Key Specifications */}
            <div className="bg-white rounded-xl p-6 shadow-elevated">
              <h3 className="font-display text-xl text-charcoal mb-4">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gold/10 p-2 rounded-lg">
                    <ApperIcon name="Zap" size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-slate">Engine</div>
                    <div className="font-semibold text-charcoal">{car.engine}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-info/10 p-2 rounded-lg">
                    <ApperIcon name="Settings" size={20} className="text-info" />
                  </div>
                  <div>
                    <div className="text-sm text-slate">Transmission</div>
                    <div className="font-semibold text-charcoal">{car.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 p-2 rounded-lg">
                    <ApperIcon name="Gauge" size={20} className="text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-slate">Mileage</div>
                    <div className="font-semibold text-charcoal">{car.mileage.toLocaleString()} mi</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-crimson/10 p-2 rounded-lg">
                    <ApperIcon name="Car" size={20} className="text-crimson" />
                  </div>
                  <div>
                    <div className="text-sm text-slate">Type</div>
                    <div className="font-semibold text-charcoal">{car.type}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-elevated">
              <h3 className="font-display text-xl text-charcoal mb-4">Features & Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ApperIcon name="Check" size={16} className="text-success" />
                    <span className="text-charcoal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financing Calculator */}
            <div className="bg-white rounded-xl p-6 shadow-elevated">
              <h3 className="font-display text-xl text-charcoal mb-4">Finance Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Down Payment: ${downPayment.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={car.price}
                    step={1000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Loan Term: {loanTerm} months
                  </label>
                  <input
                    type="range"
                    min={24}
                    max={84}
                    step={12}
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="bg-gold/10 p-4 rounded-lg">
                  <div className="text-sm text-slate mb-1">Estimated Monthly Payment</div>
                  <div className="text-2xl font-bold text-gold">
                    ${monthlyPayment.toLocaleString("en-US", { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!car.inStock}
              >
                <ApperIcon name="ShoppingCart" size={20} />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ApperIcon name="Heart" size={20} />
                Save to Favorites
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;