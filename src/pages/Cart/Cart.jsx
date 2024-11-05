import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Cart.css"
import WhiteButton from "../../components/WhiteButton/WhiteButton"

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
                        <div className="quantity"><input type="number" required default="1" /></div>
                        <div className="subtotal">$650</div>
                    </div>
                    <div className="cartMain_row">
                        <div className="product">
                            <img src="../../public/Monitor-Cart-Small.png" alt="" />LCD monitor
                        </div>
                        <div className="price">$650</div>
                        <div className="quantity"><input type="number" required default="1" /></div>
                        <div className="subtotal">$650</div>
                    </div>
                    <div className="cartMain_row">
                        <div className="product">
                            <img src="../../public/Monitor-Cart-Small.png" alt="" />LCD monitor
                        </div>
                        <div className="price">$650</div>
                        <div className="quantity"><input type="number" required default="1" /></div>
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
            </div>
            <Footer></Footer>
        </>
    );
}
export default Cart;