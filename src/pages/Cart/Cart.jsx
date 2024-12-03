import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Cart.css"
import WhiteButton from "../../components/WhiteButton/WhiteButton"
import Redbutton from "../../components/RedButton/Redbutton";
function Cart() {
    return (
        <>
            <Header></Header>
            <div className="Roadmap">
                Home  /  Cart
            </div>
            <div className="cart-container">
                <div className="cartMain">
                    <div className="cartMain_row">
                        <div><p>Product</p></div>
                        <div><p>Price</p></div>
                        <div><p>Quantity</p></div>
                        <div><p>Subtotal</p></div>
                    </div>
                    <div className="cartMain_row">
                        <div className="product">
                            <img src="../../public/Monitor-Cart-Small.png" alt="" />LCD monitor
                        </div>
                        <div className="price">$650</div>
                        <div className="quantity"><input type="number" placeholder="1" /></div>
                        <div className="subtotal">$650</div>
                    </div>
                    <div className="cartMain_row">
                        <div className="product">
                            <img src="../../public/Monitor-Cart-Small.png" alt="" />LCD monitor
                        </div>
                        <div className="price">$650</div>
                        <div className="quantity"><input type="number" placeholder="1" /></div>
                        <div className="subtotal">$650</div>
                    </div>
                    <div className="cartMain_row">
                        <div className="product">
                            <img src="../../public/Monitor-Cart-Small.png" alt="" />LCD monitor
                        </div>
                        <div className="price">$650</div>
                        <div className="quantity"><input type="number" placeholder="1" /></div>
                        <div className="subtotal">$650</div>
                    </div>
                </div>
                <div className="item-button">
                    <div className="item-button-return">
                        <WhiteButton text="Return To Shop"></WhiteButton>
                    </div>
                    <div className="item-button-update">
                        <WhiteButton text="Update Cart"></WhiteButton>
                    </div>
                </div>
                <div className="cartMain_row"></div>
                <div className="coupon-container">
                    <div className="coupon">
                        <div className="coupon-box">
                            <input type="text" placeholder="Coupon Code"></input>
                        </div>
                        <div className="coupon-button">
                            <Redbutton text="Add Coupon"></Redbutton>
                        </div>
                    </div>
                    <div className="toCheckout">
                        <p>Cart Total</p>
                        <div className="toCheckout-name">
                            Subtotal:
                            <div className="toCheckout-price">
                                $1750
                            </div>
                        </div>
                        <hr />
                        <div className="toCheckout-name">
                            Shipping:
                            <div className="toCheckout-price">
                               Free
                            </div>
                        </div>
                        <hr />
                        <div className="toCheckout-name">
                            Total:
                            <div className="toCheckout-price">
                                $1750
                            </div>
                        </div>
                        <div className="checkout-process">
                        <Redbutton text="Process to checkout"></Redbutton>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}
export default Cart;
//gfgh