import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import WishListItem from "../../components/WishListItem/WishListItem";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";

function WishList() {
  const [wishListItems, setWishListItems] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishListItems();
  }, []);

  const showCartAddtMessage = () => {
    toast.success("Product Added to cart!", {
      position: "top-right",
    });
  };

  const showItemDeleteMessage = () => {
    toast.info("Product removed from cart!", {
      position: "top-right",
    });
  };

  const showErrorMessage = () => {
    toast.error("Something went wrong!", {
      position: "top-right",
    });
  };

  const fetchWishListItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/wishlist/${localStorage.getItem(
          "userId"
        )}`
      );
      const data = await response.json();
      fetchProducts(data.productIds);
      console.log("Wishlist data:", data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      showErrorMessage();
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const products = [];
      for (const id of productIds) {
        const response = await fetch(
          `${BASE_URL}/products/${id}`
        );
        const product = await response.json();
        products.push(product);
      }
      console.log("Fetched products with quantities:", products);
      setWishListItems(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      showErrorMessage();
    }
  };

  const removeItemFromWishList = async (productId) => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${BASE_URL}/wishlist/remove/${localStorage.getItem(
          "userId"
        )}/${productId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      showItemDeleteMessage();
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      showErrorMessage();
    } finally {
      setIsUpdating(false);
    }
  };

  const addToCart = async (productId) => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${BASE_URL}/carts/add/${localStorage.getItem(
          "userId"
        )}/${productId}/1`,
        { method: "POST" }
      );
      showCartAddtMessage();
      const data = await response.json();
    } catch (error) {
      console.error("Error adding to cart items:", error);
      showErrorMessage();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Wishlist Header */}
          <div className="flex justify-between items-center my-20 mx-4 lg:mx-[135px]">
            <h1 className="text-xl lg:text-2xl font-medium">
              Wishlist ({wishListItems.length} items)
            </h1>
            <WhiteButton text="Move to Bag" onClick = {()=> navigate("/cart")}/>
          </div>

          {/* Wishlist Items */}
          <div className="px-4 lg:px-[135px]">
            {isLoading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : wishListItems.length > 0 ? (
              <>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {wishListItems.map((item) => (
                    <WishListItem
                      key={item.id}
                      discount="-29%"
                      itemName={item.name}
                      nowPrice={item.price}
                      wasPrice={item.price}
                      image={item.imageUrl1}
                      onDeleteClick={() =>
                        removeItemFromWishList(item.id).then(() =>
                          fetchWishListItems()
                        )
                      }
                      onAddToCartClick={() => addToCart(item.id)}
                      onClick={() => navigate(`/productdetails/${item.id}`)}
                    />
                  ))}
                </div>
                {isUpdating && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-gray-600 text-lg">
                Your wishlist is empty
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default WishList;
