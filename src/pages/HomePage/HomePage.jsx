import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WishListItemReview from "../../components/WishListItemReview/WishListItemReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const [flashsales, setFlashSales] = useState([]);
  const [discountedPrices, setDiscountedPrices] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchFlashSales();
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

  const isFlashSaleValid = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate >= start && currentDate <= end;
  };

  const fetchFlashSales = async () => {
    try {
      const response = await fetch(`https://e-commerce-site-spring-boot-production.up.railway.app/api/flashsales`);
      const data = await response.json();
      const validFlashSales = data.filter((sale) =>
        isFlashSaleValid(sale.startDate, sale.endDate)
      );

      const productsIds = [];
      const discountedPrices = {};

      validFlashSales.forEach((product) => {
        productsIds.push(product.productId);
        discountedPrices[product.productId] = product.discountedPrice;
      });

      fetchProducts(productsIds);
      setDiscountedPrices(discountedPrices);
    } catch (error) {
      console.error("Error fetching Flash Sales:", error);
      showErrorMessage();
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const products = [];
      for (const id of productIds) {
        const response = await fetch(
          `https://e-commerce-site-spring-boot-production.up.railway.app/api/products/${id}`
        );
        const product = await response.json();
        products.push(product);
      }
      console.log("Fetched products with quantities:", products);
      setFlashSales(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      showErrorMessage();
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(
        `https://e-commerce-site-spring-boot-production.up.railway.app/api/carts/add/${localStorage.getItem(
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

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "../../public/electronic.png",
    },

    {
      id: 2,
      name: "Clothes",
      image: "../../public/clothes.png",
    },
    {
      id: 3,
      name: "Shoes",
      image: "../../public/shoes.png",
    },
    {
      id: 1,
      name: "Electronics",
      image: "../../public/electronic.png",
    },

    {
      id: 2,
      name: "Clothes",
      image: "../../public/clothes.png",
    },
    {
      id: 3,
      name: "Shoes",
      image: "../../public/shoes.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-[135px] pt-[40px] max-w-[1440px] mx-auto">
        <div className="flex justify-between bg-white rounded-lg shadow-sm p-6">
          <div className="flex">
            <div className="flex flex-col space-y-4">
              {['Woman\'s Fashion', 'Men\'s Fashion', 'Electronics', 'Home & Lifestyle', 
                'Medicine', 'Sports & Outdoor', 'Baby\'s & Toys', 'Groceries', 
                'Health & Beauty'].map((item, index) => (
                <div key={index} 
                  className="hover:text-[#DB4444] cursor-pointer transition-colors duration-200 flex items-center space-x-2">
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="h-full w-[1px] bg-gray-200 ml-[50px]"></div>
          </div>
          
          <div className="w-2/3 flex items-center">
            <Swiper
              autoplay={{
                delay: 5000, // Changed to 1000ms (1 second)
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Pauses on hover
              }}
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]} // Add Autoplay to modules
              className="rounded-lg shadow-md"
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

        {/* Flash Sales Section */}
        <div className="mt-16">
          <div className="flex items-center">
            <div className="h-[40px] w-[20px] bg-[#DB4444] rounded-[4px]"></div>
            <div className="pl-3 text-[#DB4444] font-semibold">Flash Sales</div>
          </div>
          <div className="pt-8">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {flashsales.map((item, index) => (
                <WishListItemReview
                  key={item.id}
                  discount={
                    Math.round(
                      ((item.price - discountedPrices[item.id]) / item.price) *
                        100
                    ) + "%"
                  }
                  itemName={item.name}
                  nowPrice={discountedPrices[item.id]}
                  wasPrice={item.price}
                  image={item.imageUrl1}
                  count="65"
                  rating={item.rating}
                  onAddToCartClick={() => addToCart(item.id)}
                  onClick={() => navigate(`/productdetails/${item.id}`)}
                ></WishListItemReview>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-20">
          <div className="flex items-center">
            <div className="h-[40px] w-[20px] bg-[#DB4444] rounded-[4px]"></div>
            <div className="pl-3 text-[#DB4444] font-semibold">Categories</div>
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-8">Browse By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md 
                  border border-transparent hover:border-[#DB4444] cursor-pointer 
                  transition-all duration-300 flex flex-col items-center justify-center"
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center 
                  group-hover:bg-red-50 transition-colors duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-medium mt-4 group-hover:text-[#DB4444] 
                  transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[100px]"></div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default HomePage;
