import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import "./WishList.css";
import WishListItem from "../../components/WishListItem/WishListItem";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WishList() {
  const [wishListItems, setWishListItems] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);

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
        )}/${productId}`,
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
    <div>
      <Header></Header>

      <div className="wish-list">
        <div className="wish-list-row">
          Wishlist ({wishListItems.length} items)
          <WhiteButton text="Move to Bag"></WhiteButton>
        </div>
        <div className="px-[135px]">
          <div className="flex overflow-y-scroll">
            {wishListItems.map((item) => (
              <WishListItem
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
              ></WishListItem>
              
              
            ))}
          </div>
        </div>
        <div className="flex justify-between px-[135px] pt-[88px]">
          <div className="flex items-center">
            <div className="h-[40px] w-[20px] bg-[#DB4444] rounded-[4px]"></div>
            <div className="pl-3">Just For You</div>
          </div>
          <div>
            <WhiteButton text="See All"></WhiteButton>
          </div>
        </div>

        <div className="px-[135px] pt-[68px] pb-[140px]">
          <div className="flex overflow-y-scroll">
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              rating={0}
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              rating={0}
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              rating={0}
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              rating={0}
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              rating={0}
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              rating={0}
              count="65"
            ></WishListItemReview>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default WishList;
