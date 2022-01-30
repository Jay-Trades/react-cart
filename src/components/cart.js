import React, { Component } from 'react';
import formatCurrency from "../utils.js";

export default class cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckout : false,
            name : "",
            email : "",
            address : "",
        }
    }
    handleInput = (e) => {
        console.log("hello");
        this.setState({ [e.target.name] : e.target.value});
    }
    onCreateOrder = (e) => {
        e.preventDefault(); // this prevents the default action of the form
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order);
    } 

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
            <div>
            <div className="cart">
                <div className="total">
                Total{" "}
                    {formatCurrency(cartItems.reduce((a,c) => a+c.price * c.count, 0))} 
                    {/* need to supply a inital value because we have objs not just ints */}
                </div>
                <button onClick={() => this.setState({showCheckout: true})} className="button primary">Proceed</button>
            </div>
            {/* this part is to show the checkout little form when there is item is the cart */}
            {this.state.showCheckout && (
                <div className="cart">
                <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                        <li>
                            <label>Email</label>
                            <input name="email" type="email" required onChange={this.handleinput}></input>
                        </li>
                        <li>
                            <label>Name</label>
                            <input name="name" type="text" required onChange={this.handleinput}></input>
                        </li>
                        <li>
                            <label>Address</label>
                            <input name="address" type="text" required onChange={this.handleinput}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary" onClick={this.onCreateOrder}>Checkout</button>
                        </li>
                    </ul>
                </form>
                </div>
                )
            }
            </div>
        )}

        </div>
    </div>
    )
  }
}
