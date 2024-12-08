import React from 'react'

const WishListItem = ({discount, itemName, nowPrice, wasPrice, image, onDeleteClick, onAddToCartClick, onClick}) => {
  return (
    <div className="inline-block px-3 mb-4">
      <div className="h-[209px] w-[270px] bg-[#F5F5F5] flex items-center justify-center flex-col relative cursor-pointer" onClick={onClick}>
        <div className="w-full flex justify-between px-[13px] items-center absolute top-2">
          <div className="h-[26px] w-[55px] bg-[#DB4444] text-center text-[12px] flex justify-center items-center text-[#fafafa] rounded-[4px]">
            {discount}
          </div>
          <button 
            className="bg-white h-[34px] w-[34px] flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
          >
            <img src="/icon-delete.png" alt="Delete" className="w-5 h-5" />
          </button>
        </div>
        <img src={image} alt={itemName} className="w-[100px] h-[100px] object-contain" />
      </div>
      
      <button className="h-[41px] w-[270px] bg-[#000000] flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors" onClick={onAddToCartClick}>
        <img src="/Cart1.png" alt="Cart" className="w-5 h-5" />
        <span className="text-[#fafafa] text-[12px]">Add to Cart</span>
      </button>

      <div className="pt-4 font-medium">{itemName}</div>
      <div className="flex gap-4 items-center">
        <span className="text-[#DB4444] font-semibold">{nowPrice}</span>
        <span className="text-[#d9d9d9] line-through">{wasPrice}</span>
      </div>
    </div>
  )
}

export default WishListItem
