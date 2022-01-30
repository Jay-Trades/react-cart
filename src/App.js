import './App.css';
import data from "./data.json";
import React from "react";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/cart";


//test change to github.com/
//feature 1
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems") !== 'undefined' ? JSON.parse(localStorage.getItem("cartItems")) : []
    };
  }
  createOrder = (order) => {
    console.log(order.name);
    alert("need to save order for" + order.name);
  }

  removeFromCart = (product) => {
    console.log("inside remove cart")
    let cartItems = this.state.cartItems.slice();
    cartItems = cartItems.filter(item => {    //() after arrow means automatic return usually 1 line but {} means u have to specify "return"
      return item._id !== product._id
    })    
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  };

  addToCart = (product) => {
    console.log("inside remove cart")
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems})  //you can just call cartItems single here i guess cause its the same name
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, products: data.products}) //data.products because it is the whole list. state.products could already be filtered
    }else{
      let temp = data.products.filter((product) => product.availableSizes.includes(event.target.value));
      this.setState({size: event.target.value, products: temp})
    }
  };
  
  sortProducts = (event) => {
    console.log(event.target.value)
    if(event.target.value === "lowest"){
      this.state.products.sort((first, second) => first.price - second.price)
    }else if (event.target.value === "highest"){
      this.state.products.sort((first, second) => second.price - first.price)
    }else{
      this.setState({products: this.state.products})
    }
    this.setState({sort: event.target.value})
  };

  render() {
      return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className = "content">
              <div className="main"> 
                <Filter count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                />

                <Products products={this.state.products} addToCart={this.addToCart}/>
              </div>
              <div className="sidebar"> 
                <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
              </div>              
          </div>
        </main>
        <footer>all rights reserved</footer>
      </div>
    );
  };
};

export default App;
