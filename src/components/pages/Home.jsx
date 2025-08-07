import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import CarGrid from "@/components/organisms/CarGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { carService } from "@/services/api/carService";
import { toast } from "react-toastify";

const Home = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    priceRange: [15000, 150000],
    makes: [],
    types: [],
    transmission: []
  });

  const loadCars = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = await carService.getAll();
      setCars(data);
      setFilteredCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, cars, searchParams]);

  const applyFilters = () => {
    let filtered = [...cars];
    const searchQuery = searchParams.get("search");

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query) ||
        car.color.toLowerCase().includes(query)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(car =>
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    // Apply make filter
    if (filters.makes.length > 0) {
      filtered = filtered.filter(car => filters.makes.includes(car.make));
    }

    // Apply type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter(car => filters.types.includes(car.type));
    }

    // Apply transmission filter
    if (filters.transmission.length > 0) {
      filtered = filtered.filter(car => filters.transmission.includes(car.transmission));
    }

    setFilteredCars(filtered);
  };

  const handleViewDetails = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleAddToCart = (car) => {
    onAddToCart(car);
    toast.success(`${car.make} ${car.model} added to cart!`);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: [15000, 150000],
      makes: [],
      types: [],
      transmission: []
    });
  };

  const searchQuery = searchParams.get("search");

  return (
    <div className="min-h-screen bg-pearl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display text-charcoal mb-2">
                {searchQuery ? (
                  <>Search Results for "<span className="gradient-text">{searchQuery}</span>"</>
                ) : (
                  <>Premium <span className="gradient-text">Vehicles</span></>
                )}
              </h1>
              <p className="text-slate text-lg">
                {searchQuery 
                  ? `Found ${filteredCars.length} vehicles matching your search`
                  : `Discover ${filteredCars.length} exceptional vehicles in our curated collection`
                }
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white rounded-lg shadow-elevated p-1">
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <ApperIcon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <ApperIcon name="List" size={16} />
                </Button>
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden"
              >
                <ApperIcon name="Filter" size={16} />
                Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.makes.length > 0 || filters.types.length > 0 || filters.transmission.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.makes.map(make => (
                <span key={make} className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium">
                  {make}
                </span>
              ))}
              {filters.types.map(type => (
                <span key={type} className="bg-info/20 text-info px-3 py-1 rounded-full text-sm font-medium">
                  {type}
                </span>
              ))}
              {filters.transmission.map(transmission => (
                <span key={transmission} className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium">
                  {transmission}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            cars={cars}
            isOpen={false}
          />

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            cars={cars}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Car Grid */}
          <div className="flex-1">
            <CarGrid
              cars={filteredCars}
              loading={loading}
              error={error}
              onViewDetails={handleViewDetails}
              onAddToCart={handleAddToCart}
              onRetry={loadCars}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;