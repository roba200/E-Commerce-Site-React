import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

function HomePage() {
  useEffect(() => {
    fetchFlashSales();
  }, []);

  const fetchFlashSales = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/flashsales`
      );
      const data = await response.json();
      const productsIds = [];
      const discountedPrices = [];

      for(const product of data){
        productsIds.push(product.productId);
        discountedPrices.push(product.discountedPrice);
      }
      fetchProducts(productsIds,discountedPrices);
      console.log("Flash Sale data:", discountedPrices);
    } catch (error) {
      console.error("Error fetching Flash Sales:", error);
    }
  };

  const fetchProducts = async (productIds,discountedPrices) => {
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
      //setWishListItems(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      //showErrorMessage();
    }
  };

  return (
    <div>
      <Header />
      <div className="px-[135px] pt-[40px]">
        <div className="flex justify-between ">
          <div className="flex">
            <div className="flex flex-col justify-between">
              <div>Woman's Fashion</div>
              <div>Men's Fashions</div>
              <div>Electronics</div>
              <div>Home & Lifestyle</div>
              <div>Medicine</div>
              <div>Sports & Outdoor</div>
              <div>Baby's & Toys</div>
              <div>Groceries</div>
              <div>Health & Beauty</div>
            </div>
            <div className="h-full w-[2px] bg-[#000000] ml-[50px]"></div>
          </div>
          <div className="w-2/3 flex  items-center">
            <Swiper
              autoplay={{
                delay: 100, // Time in ms between each slide transition
                disableOnInteraction: false, // Keeps autoplay running after user interaction
              }}
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="../../../public/Frame 560.png" alt="" srcset="" />
              </SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="flex items-center pt-[50px]">
          <div className="h-[40px] w-[20px] bg-[#DB4444] rounded-[4px]"></div>
          <div className="pl-3">New</div>
        </div>
        <div className="pt-[68px]">
          <div className="flex overflow-y-scroll">
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              count="65"
            ></WishListItemReview>
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
              count="65"
            ></WishListItemReview>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
