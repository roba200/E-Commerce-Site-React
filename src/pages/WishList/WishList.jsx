import React from "react";
import Header from "../../components/Header/Header";
import WhiteButton from "../../components/WhiteButton/WhiteButton";
import "./WishList.css";
import WishListItem from "../../components/WishListItem/WishListItem";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";

function WishList() {
  return (
    <div>
      <Header></Header>

      <div className="wish-list">
        <div className="wish-list-row">
          Wishlist (4)
          <WhiteButton text="Move to Bag"></WhiteButton>
        </div>
        <div className="px-[135px]">
          <div className="flex overflow-y-scroll">
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
            <WishListItem
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItem>
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

        <div className="px-[135px] pt-[135px]">
          <div className="flex overflow-y-scroll">
            <WishListItemReview
              discount="-29%"
              itemName="Gucci duffle bag"
              nowPrice="$20"
              wasPrice="$50"
              image="./bag.png"
            ></WishListItemReview>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
