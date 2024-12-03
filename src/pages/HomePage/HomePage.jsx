import React from "react";
import Header from "../../components/Header/Header";
import CarouselCustom from "../../components/CarouselCustom/CarouselCustom";

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
        <div className="h-[100px] w-[200px] bg-black ">
            <CarouselCustom />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
