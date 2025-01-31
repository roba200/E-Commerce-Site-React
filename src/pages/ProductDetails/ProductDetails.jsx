import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../constants/Constants";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/products/${id}`
      );
      const data = await response.json();
      setProduct(data);
      setSelectedImage(data.imageUrl1);
    } catch (error) {
      toast.error("Error loading product details");
    }
  };

  const getCartItemQuantity = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/carts/user/${localStorage.getItem(
          "userId"
        )}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        // Check if product exists in cart and return its quantity
        console.log(data);
        return data.productQuantities[id] || 0;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  };

  const addToCart = async () => {
    try {
      const currentQuantity = await getCartItemQuantity();
      const newQuantity = currentQuantity + quantity;

      const endpoint =
        currentQuantity > 0
          ? `${BASE_URL}/carts/update/${localStorage.getItem(
              "userId"
            )}/${id}/${newQuantity}`
          : `${BASE_URL}/carts/add/${localStorage.getItem(
              "userId"
            )}/${id}/${newQuantity}`;

      console.log(currentQuantity);

      const response = await fetch(endpoint, {
        method: currentQuantity > 0 ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
      });

      if (response.ok) {
        toast.success(
          currentQuantity > 0
            ? "Cart updated successfully!"
            : "Product added to cart!"
        );
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      toast.error("Error updating cart");
    }
  };

  const addToWishlist = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/wishlist/add/${localStorage.getItem(
          "userId"
        )}/${id}`,
        { method: "POST" }
      );
      if (response.ok) {
        toast.success("Product added to wishlist!");
      }else{
        toast.info("Product already in wishlist!");
      }
      return 0;
    } catch (error) {
      toast.error("Error adding to wishlist");
      return 0;
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => {
                const imageUrl = product[`imageUrl${num}`];
                return imageUrl ? (
                  <img
                    key={num}
                    src={imageUrl}
                    alt={`thumbnail ${num}`}
                    className={`w-full h-24 object-cover rounded cursor-pointer ${
                      selectedImage === imageUrl
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                    onClick={() => setSelectedImage(imageUrl)}
                  />
                ) : null;
              })}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < product.rating ? "fill-current" : "fill-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">({product.rating} ratings)</span>
            </div>

            <div className="text-2xl font-bold">${product.discountedPrice}</div>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value)))
                  }
                  className="w-16 text-center py-1"
                />
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart()}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist()}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Add to Wish List
              </button>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Product Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Category: {product.category}</li>
                <li>Brand: {product.brand}</li>
                <li>Stock: {product.quantityInStock} units</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default ProductDetails;
