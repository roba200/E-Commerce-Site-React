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
import { BASE_URL } from "../../constants/Constants";

function HomePage() {
  const [flashsales, setFlashSales] = useState([]);
  const [discountedPrices, setDiscountedPrices] = useState({});
  const [regularProducts, setRegularProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlashSales();
    fetchRegularProducts();
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
      const response = await fetch(`${BASE_URL}/flashsales`);
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
        const response = await fetch(`${BASE_URL}/products/${id}`);
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

  const fetchRegularProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();
      setRegularProducts(data);
    } catch (error) {
      console.error("Error fetching regular products:", error);
      showErrorMessage();
    }
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

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "/electronic.png",
    },

    {
      id: 2,
      name: "Computers",
      image: "/computer.png",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      image: "/home.png",
    },
    {
      id: 4,
      name: "Home Appliances",
      image: "/home-app.png",
    },

    {
      id: 5,
      name: "Bar & Wine",
      image: "/wine.png",
    },
    {
      id: 6,
      name: "Fashion",
      image: "/fashion.png",
    },
    {
      id: 7,
      name: "Office Furniture",
      image: "/furniture.png",
    },

    {
      id: 8,
      name: "Health & Beauty",
      image: "/beauty.png",
    },

    {
      id: 9,
      name: "Sports & Outdoors",
      image: "/sports.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-[135px] pt-[40px] max-w-[1440px] mx-auto">
        <div className="flex justify-between bg-white rounded-lg shadow-sm p-6">
          <div className="flex">
            <div className="flex flex-col space-y-4">
              {[
                "Woman's Fashion",
                "Men's Fashion",
                "Electronics",
                "Home & Lifestyle",
                "Medicine",
                "Sports & Outdoor",
                "Baby's & Toys",
                "Groceries",
                "Health & Beauty",
              ].map((item, index) => (
                <div
                  key={index}
                  className="hover:text-[#DB4444] cursor-pointer transition-colors duration-200 flex items-center space-x-2"
                >
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
                <img
                  src="https://img.freepik.com/free-vector/gradient-12-12-sale-background_23-2149172191.jpg?t=st=1734415752~exp=1734419352~hmac=268e537261a0304688b581823857a7308c23e5fbfd505da56709859bda9e04be&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/abstract-colorful-sales-wallpaper_23-2148391281.jpg?t=st=1734415833~exp=1734419433~hmac=1dda7c83bb77aa414728b53b09730a2bad9953cb92d0bb4d4057d9fcb020c7d0&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/gradient-12-12-sale-background_23-2149172195.jpg?t=st=1734415628~exp=1734419228~hmac=560a1df4b8f9f17c39165dbe23e7d296b9db1521834180b1029463c85e3ba8a2&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/gradient-12-12-sale-background_23-2149172196.jpg?t=st=1734416144~exp=1734419744~hmac=da6fc35b51007d5865c414ea7cc8a08a9423fb6b878a702be37fc19c7a15d9d8&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/gradient-sale-background_23-2148863709.jpg?t=st=1734416211~exp=1734419811~hmac=493b4836487f9951e7b0c21b015faad72452d50db07b6b1ee92919e3c7825496&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/gradient-sale-background-with-special-discount_23-2149045187.jpg?t=st=1734416252~exp=1734419852~hmac=b885c99128d1e3a8362303936fe0585ea5fcbfdd231a7d343e12481931ef1456&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/creative-coming-soon-teaser-background_23-2148897217.jpg?t=st=1734416322~exp=1734419922~hmac=06ef7b5ac2fff42c157be9877ad7c7055a065aeae7596dc2d10e38be64b11cec&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://img.freepik.com/free-vector/abstract-colorful-sales-background_23-2148408641.jpg?t=st=1734416390~exp=1734419990~hmac=aae58e1ac205e9129b07e7468f893917722c19f52fb7fc06a83f1dc8e13cdc0b&w=996"
                  alt=""
                  srcset=""
                />
              </SwiperSlide>
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
            {flashsales.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {flashsales.map((item, index) => (
                  <WishListItemReview
                    key={item.id}
                    discount={
                      Math.round(
                        ((item.price - discountedPrices[item.id]) /
                          item.price) *
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
            ) : (
              <div className="text-center py-8 text-gray-600 text-lg">
                No Flash Sales Available at the moment
              </div>
            )}
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
                onClick={() => navigate(`/category/${category.name}`)}
              >
                <div
                  className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center 
                  group-hover:bg-red-50 transition-colors duration-300"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3
                  className="text-base font-medium mt-4 group-hover:text-[#DB4444] 
                  transition-colors duration-300 text-center"
                >
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Products Section */}
        <div className="mt-20">
          <div className="flex items-center">
            <div className="h-[40px] w-[20px] bg-[#DB4444] rounded-[4px]"></div>
            <div className="pl-3 text-[#DB4444] font-semibold">
              Our Products
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-8">Explore Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProducts.map((product) => (
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

        <div className="h-[100px]"></div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default HomePage;
