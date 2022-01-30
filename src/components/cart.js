import React, { Component } from 'react';
import formatCurrency from "../utils.js";

export default class cart extends Component {
  render() {
      const {cartItems} = this.props;
    return (
    <div>
        {cartItems.length === 0 ? (<div className="cart cart-header">Cart is Empty</div>)
        :
        (<div className="cart cart-hearder">You have {cartItems.length} items in the cart</div>)
        }
        <div>
        <div className="cart">
            <ul className="cart-items">
                {cartItems.map(item => (
                    <li key={item._id}>
                        <div>
                            <img src={item.image} alt={item.title}></img>
                        </div>
                        <div>
                            <div>{item.title}</div>
                            <div className="right">
                                {formatCurrency(item.price)} x {item.count} {' '}
                            <button onClick={() => this.props.removeFromCart(item)}>Remove</button>
                            </div>
                        </div>
                    </li>)
                )}
            </ul>
        </div>
        {/* conidtional rendering if the length of cart is not 0 then we render else we hide */}
        {cartItems.length!==0 && (
            <div className="cart">
                <div className="total">
                Total{" "}
                    {formatCurrency(cartItems.reduce((a,c) => a+c.price * c.count, 0))} 
                    {/* need to supply a inital value because we have objs not just ints */}
                </div>
                <button className="button primary">Proceed</button>
            </div>
        )}

        </div>
    </div>
    )
  }
}
