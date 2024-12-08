import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import WishListItem from "../../components/WishListItem/WishListItem";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function WishList() {
  const [wishListItems, setWishListItems] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
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
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/${localStorage.getItem("userId")}`
      );
      const data = await response.json();
      fetchProducts(data.productIds);
      console.log("Wishlist data:", data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      showErrorMessage();
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const products = [];
      for (const id of productIds) {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
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
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/remove/${localStorage.getItem(
          "userId"
        )}/${productId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      showItemDeleteMessage();
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      showErrorMessage();
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/add/${localStorage.getItem(
          "userId"
        )}/${productId}/1`,
        { method: "POST" }
      );
      showCartAddtMessage();
      const data = await response.json();
    } catch (error) {
      console.error("Error adding to cart items:", error);
      showErrorMessage();
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
            <WhiteButton text="Move to Bag" />
          </div>

          {/* Wishlist Items */}
          <div className="px-4 lg:px-[135px]">
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
                    removeItemFromWishList(item.id).then(() => fetchWishListItems())
                  }
                  onAddToCartClick={() => addToCart(item.id)}
                  onClick={() => navigate(`/productdetails/${item.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Just For You Section */}
          <div className="flex justify-between items-center px-4 lg:px-[135px] pt-[88px]">
            <div className="flex items-center">
              <div className="h-10 w-5 bg-[#DB4444] rounded"></div>
              <h2 className="pl-3 text-lg font-medium">Just For You</h2>
            </div>
            <WhiteButton text="See All" />
          </div>

          {/* Review Items */}
          <div className="px-4 lg:px-[135px] pt-[68px] pb-[140px]">
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              <WishListItemReview
                discount="-29%"
                itemName="Gucci duffle bag"
                nowPrice="$20"
                wasPrice="$50"
                image="./bag.png"
                rating={0}
                count="65"
              />
              <WishListItemReview
                discount="-29%"
                itemName="Gucci duffle bag"
                nowPrice="$20"
                wasPrice="$50"
                image="./bag.png"
                rating={0}
                count="65"
              />
              <WishListItemReview
                discount="-29%"
                itemName="Gucci duffle bag"
                nowPrice="$20"
                wasPrice="$50"
                image="./bag.png"
                rating={0}
                count="65"
              />
              <WishListItemReview
                discount="-29%"
                itemName="Gucci duffle bag"
                nowPrice="$20"
                wasPrice="$50"
                image="./bag.png"
                rating={0}
                count="65"
              />
              <WishListItemReview
                discount="-29%"
                itemName="Gucci duffle bag"
                nowPrice="$20"
                wasPrice="$50"
                image="./bag.png"
                rating={0}
                count="65"
              />
              <WishListItemReview
                discount="-29%"
                itemName="Gucci duffle bag"
                nowPrice="$20"
                wasPrice="$50"
                image="./bag.png"
                rating={0}
                count="65"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default WishList;
