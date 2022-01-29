import React, { Component } from 'react';

export default class filter extends Component {
  render() {
    return (
    <div className="filter">
        <div className="filter-result">{this.props.count} Items</div>
        <div className="filter-sort">
        Order
        <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
        </select>
        </div>
        <div className="filter-size" value={this.props.filter} onChange={this.props.filterProducts}> 
        {/* this on change works because when changed onchange is already listening. 
        We get the event and our function gets called. You can get event.target.value and use it */}
        Filter
        <select>
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>

        </select></div>

    </div>
    )
  }
}
