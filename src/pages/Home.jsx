import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import Header from "../pages/Header";
import ProductCard from "../components/ProductCard";

const Home = ({user}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      title: "Premium Wireless Headphones",
      description:
        "High-quality audio with active noise cancellation and 30-hour battery life.",
      rating: 4.5,
      price: 299.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      title: "Smart Watch Pro",
      description: "Track your fitness goals with advanced health monitoring.",
      rating: 4.8,
      price: 399.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      title: "Designer Sunglasses",
      description: "UV protection with style and premium polarized lenses.",
      rating: 4.3,
      price: 159.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      title: "Wireless Bluetooth Speaker",
      description: "Portable speaker with crystal clear sound.",
      rating: 4.6,
      price: 129.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      title: "Fitness Tracker Band",
      description: "Monitor your daily activities and heart rate.",
      rating: 4.4,
      price: 89.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      title: "Premium Camera Lens",
      description: "Professional-grade lens with exceptional quality.",
      rating: 4.7,
      price: 549.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      title: "USB-C Fast Charger",
      description: "Quick charge with 65W power delivery.",
      rating: 4.5,
      price: 49.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      title: "Wireless Mouse Pro",
      description: "Ergonomic design with precision tracking.",
      rating: 4.6,
      price: 79.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      title: "Mechanical Keyboard",
      description: "Premium mechanical switches with RGB lighting.",
      rating: 4.8,
      price: 199.99,
    },
    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      title: "4K Webcam",
      description: "Professional streaming camera with auto-focus.",
      rating: 4.7,
      price: 149.99,
    },
  ];

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const filterOptions = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home & Garden" },
  ];

  const handleAddProduct = () => {
    // Add navigation logic here
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const getPaginationPages = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Header user={user} />

      {/* Search and Filter Section */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-8">
          {/* Search Bar and Button */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 appearance-none pr-10 bg-white cursor-pointer"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="bg-gray-50 px-6 py-6 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              description={product.description}
              rating={product.rating}
              price={product.price}
              onEdit={() => console.log("Edit:", product.title)}
              onDelete={() => console.log("Delete:", product.title)}
            />
          ))}
          {totalItems === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              1
            </button>
          )}

          {getPaginationPages()[0] > 2 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}

          {getPaginationPages().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {getPaginationPages()[getPaginationPages().length - 1] <
            totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
