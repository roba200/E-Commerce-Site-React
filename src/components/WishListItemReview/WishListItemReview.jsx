import React from "react";

const WishListItemReview = ({
  discount,
  itemName,
  nowPrice,
  wasPrice,
  image,
  count,
}) => {
  return (
    <div className="inline px-3">
      <div className="h-[209px] w-[270px] bg-[#F5F5F5] flex items-center justify-center flex-col">
        <div className="w-full flex justify-between px-[13px] items-center">
          <div className="h-[26px] w-[55px] bg-[#DB4444] text-center text-[12px] flex justify-center items-center text-[#fafafa] rounded-[4px]">
            {discount}
          </div>
          <div className="bg-white h-[34px] w-[34px] flex justify-center items-center">
            <img src="./icon-delete.png" alt="" srcset="" />
          </div>
        </div>
        <img src={image} alt="" srcset="" />
      </div>
      <div className="h-[41px] w-[270px] bg-[#000000] flex justify-center items-center">
        <img src="Cart1.png" alt="" srcset="" />
        <div className="text-[#fafafa] text-[12px]">Add to Cart</div>
      </div>

      <div className="pt-4">{itemName}</div>
      <div className="flex justify-items-start">
        <div className="text-[#DB4444] ">{nowPrice}</div>
        <div className="pl-4 text-[#d9d9d9] line-through">{wasPrice}</div>
      </div>
      <div className="flex">
        <img src="star.png" alt="" srcset="" />
        <img src="star.png" alt="" srcset="" />
        <img src="star.png" alt="" srcset="" />
        <img src="star.png" alt="" srcset="" />
        <img src="star.png" alt="" srcset="" />
      </div>
    </div>
  );
};

export default WishListItemReview;
