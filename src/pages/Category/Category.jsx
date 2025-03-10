import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  const showCartAddtMessage = () => {
    toast.success("Product Added to cart!", {
      position: "top-right",
    });
  };

  const showErrorMessage = () => {
    toast.error("Something went wrong!", {
      position: "top-right",
    });
  };

  const addToCart = async (productId) => {
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
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${name}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching regular products:", error);
      showErrorMessage();
    }
  };
  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="px-[135px] pt-[40px] max-w-[1440px] mx-auto">
        <div className="mt-16 ">
          <div className="flex items-center">
            <div className="h-[40px] w-[20px] bg-[#DB4444] rounded-[4px]"></div>
            <div className="pl-3 text-[#DB4444] font-semibold">{name}</div>
          </div>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <WishListItemReview
                discount={
                  Math.round(
                    ((product.price - product.discountedPrice) /
                      product.price) *
                      100
                  ) + "%"
                }
                wasPrice={product.price}
                itemName={product.name}
                nowPrice={product.discountedPrice}
                image={product.imageUrl1}
                rating={product.rating}
                onAddToCartClick={() => addToCart(product.id)}
                onClick={() => navigate(`/productdetails/${product.id}`)}
              />
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Category;
