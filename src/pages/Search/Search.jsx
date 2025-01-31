import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/Constants";

function Search() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsByName();
  }, [name]);

  const fetchProductsByName = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/products/search/${name}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching regular products:", error);
      showErrorMessage();
    } finally {
      setIsLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div>
        <Header></Header>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-4xl font-semibold">No results found</div>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  if (isLoading) {
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
            <div className="pl-3 text-[#DB4444] font-semibold">
              {products.length} result(s) found
            </div>
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
      </div>
      <Footer />
    </>
  );
}

export default Search;
