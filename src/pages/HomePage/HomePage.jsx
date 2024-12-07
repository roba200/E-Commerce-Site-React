import React from "react";
import Header from "../../components/Header/Header";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="flex justify-between px-[135px] pt-[40px]">
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
        <div className="w-2/3 flex  items-center" >
          <Swiper
            autoplay={{
              delay: 100,  // Time in ms between each slide transition
              disableOnInteraction: false,  // Keeps autoplay running after user interaction
            }}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><img src="../../../public/Frame 560.png" alt="" srcset="" /></SwiperSlide>
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
    </div>
  );
}

export default HomePage;
