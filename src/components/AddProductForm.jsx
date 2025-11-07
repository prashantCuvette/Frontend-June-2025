import { useState } from "react";
import {
  Upload,
  ImageIcon,
  DollarSign,
  Star,
  Package,
  FileText,
  Save,
  X,
  HelpCircle,
} from "lucide-react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showHelp, setShowHelp] = useState({});

  const helpTexts = {
    title:
      "Enter a clear and descriptive product name (e.g., 'Premium Wireless Headphones')",
    description:
      "Provide detailed information about the product, its features, and benefits. Aim for 50-150 characters.",
    price: "Enter the product price in USD. Use decimal format (e.g., 299.99)",
    rating: "Enter a rating between 0 and 5. You can use decimals (e.g., 4.5)",
    image:
      "Paste a direct image URL or upload an image file. Recommended size: 500x500px",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      image: url,
    });
    setImagePreview(url);
  };

  const toggleHelp = (field) => {
    setShowHelp({
      ...showHelp,
      [field]: !showHelp[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product data:", formData);
    alert("Product added successfully!");
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      rating: "",
      image: "",
    });
    setImagePreview(null);
    setShowHelp({});
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Add New Product
                </h2>
                <p className="text-indigo-100 mt-1">
                  Fill in the details to add a product to your store
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="title"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <Package className="w-4 h-4 text-indigo-600" />
                      Product Title
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleHelp("title")}
                      className="text-gray-400 hover:text-indigo-600 transition"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  </div>
                  {showHelp.title && (
                    <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                      {helpTexts.title}
                    </div>
                  )}
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., Premium Wireless Headphones"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="description"
                      className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      Description
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleHelp("description")}
                      className="text-gray-400 hover:text-indigo-600 transition"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  </div>
                  {showHelp.description && (
                    <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                      {helpTexts.description}
                    </div>
                  )}
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Describe your product features and benefits..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length} characters
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="price"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                      >
                        <DollarSign className="w-4 h-4 text-indigo-600" />
                        Price
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleHelp("price")}
                        className="text-gray-400 hover:text-indigo-600 transition"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                    </div>
                    {showHelp.price && (
                      <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                        {helpTexts.price}
                      </div>
                    )}
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      placeholder="299.99"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="rating"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                      >
                        <Star className="w-4 h-4 text-indigo-600" />
                        Rating
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleHelp("rating")}
                        className="text-gray-400 hover:text-indigo-600 transition"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                    </div>
                    {showHelp.rating && (
                      <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                        {helpTexts.rating}
                      </div>
                    )}
                    <input
                      id="rating"
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      required
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      placeholder="4.5"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <ImageIcon className="w-4 h-4 text-indigo-600" />
                      Product Image
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleHelp("image")}
                      className="text-gray-400 hover:text-indigo-600 transition"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  </div>
                  {showHelp.image && (
                    <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                      {helpTexts.image}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Paste image URL here..."
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition mb-3"
                  />

                  <div className="text-center text-sm text-gray-500 mb-3">
                    OR
                  </div>

                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition cursor-pointer bg-gray-50 hover:bg-indigo-50">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">
                      Upload Image
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="lg:sticky lg:top-8 h-fit">
                <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-indigo-600" />
                    Live Preview
                  </h3>

                  {imagePreview ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-1">
                          {formData.title || "Product Title"}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {formData.description ||
                            "Product description will appear here..."}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(formData.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {formData.rating || "0.0"}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">
                          ${formData.price || "0.00"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
                      <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        Upload an image to see preview
                      </p>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-xs text-blue-700 font-medium mb-1">
                      💡 Quick Tips:
                    </p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Use high-quality product images</li>
                      <li>• Keep descriptions clear and concise</li>
                      <li>• Price should include cents (e.g., 99.99)</li>
                      <li>• Rating range: 0.0 to 5.0</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5" />
                Save Product
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
