import './App.css';
import data from "./data.json";
import React from "react";
import Products from "./components/products";
import Filter from "./components/filter";

//test change to github.com/
//feature 1
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
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

                <Products products={this.state.products} />
              </div>
              <div className="sidebar"> 
                cart items
              </div>              
          </div>
        </main>
        <footer>all rights reserved</footer>
      </div>
    );
  };
};

export default App;
