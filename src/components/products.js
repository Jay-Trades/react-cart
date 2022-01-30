import React, { Component } from 'react';
import formatCurrency from "../utils.js";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";


export default class products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }
    openModal = (product) => {
        this.setState({product});
    };
    closeModal = () => {
        this.setState({product: null})
    };
  render() {
    return <div>
        <Fade bottom cascade>
        <ul className="products">
            {this.props.products.map(product => (
                <li key={product.id}>
                    <div className="product">
                        <a href={"#" + product._id}>
                            <img src={product.image} alt={product.title} onClick={() => this.openModal(product)}></img>
                            <p>
                                {product.title}
                            </p>
                        </a>
                        <div className="product-price">
                            <div>
                                {formatCurrency(product.price)}
                            </div>
                            <button className="button primary" onClick={() => this.props.addToCart(product)}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </li>
            ))}

        </ul>
        </Fade>
        {this.state.product && (<Modal isOpen={true}><Zoom>
        <button className="close-modal" onClick={this.closeModal}>x</button>
        <div>
            {/* we should do a loop through this.props.products and if it === to this.state.product._id then we display the info */}
            
            <li key={this.state.product._id}>
                    <div className="product-details">
                        <a href={"#" + this.state.product._id}>
                            <img src={this.state.product.image} alt={this.state.product.title}></img>
                            <div className = "product-details-description">
                                <p>
                                   <strong> {this.state.product.title}</strong>
                                   <p>{this.state.product.description}</p>
                                   <p>{this.state.product.availableSizes.map(size => {return <span>{" "}<button className="button">{size}</button></span>})}</p>
                                </p>
                            </div>
                        </a>
                        <div className="product-price">
                            <div>
                                {formatCurrency(this.state.product.price)}
                            </div>
                            <button className="button primary" onClick={() => {this.props.addToCart(this.state.product); this.closeModal();}}>
                            {/* so onclick before was just 1 line so no need for parenthesis now we have 2 functions we need the brackets */}
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </li>
        </div>
        </Zoom></Modal>)}
    </div>;
  }
}
