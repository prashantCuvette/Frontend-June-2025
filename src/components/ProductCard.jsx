import { Star, Edit, Trash2, ShoppingCart } from "lucide-react";

const ProductCard = ({
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
  title = "Premium Wireless Headphones",
  description = "High-quality audio with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
  rating = 4.5,
  price = 299.99,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    console.log("Edit product:", title);
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    console.log("Delete product:", title);
    if (onDelete) onDelete();
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", title);
  };

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 max-w-sm">
      {/* Image Section */}
      <div className="relative overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          New
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">{renderStars()}</div>
          <span className="text-sm font-semibold text-gray-700">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">(128 reviews)</span>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-indigo-600">
              ${price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ${(price * 1.2).toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard

// Example usage with multiple cards
// export default function App() {
//   const products = [
//     {
//       image:
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
//       title: "Premium Wireless Headphones",
//       description:
//         "High-quality audio with active noise cancellation and 30-hour battery life. Perfect for music lovers.",
//       rating: 4.5,
//       price: 299.99,
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
//       title: "Smart Watch Pro",
//       description:
//         "Track your fitness goals with advanced health monitoring and seamless smartphone integration.",
//       rating: 4.8,
//       price: 399.99,
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
//       title: "Designer Sunglasses",
//       description:
//         "UV protection with style. Premium polarized lenses and durable frame construction.",
//       rating: 4.3,
//       price: 159.99,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
//           Featured Products
//         </h1>
//         <p className="text-gray-600 text-center mb-12">
//           Discover our handpicked collection of premium products
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map((product, index) => (
//             <ProductCard
//               key={index}
//               {...product}
//               onEdit={() => console.log("Edit:", product.title)}
//               onDelete={() => console.log("Delete:", product.title)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
