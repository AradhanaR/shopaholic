import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const mapStateToProps = (state) => {
  return {
    items: state.items,
    addedItems: state.addedItems
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) }
  }
}

class Home extends Component {

  handleClick = (id) => {
    this.props.addToCart(id);
  }

  render() {
    let itemList = this.props.items.map(item => {
      return (
        <div className="card" key={item.id}>
          <div className="card-image">
            <img src={item.img} alt={item.title} />
            <span className="card-title">{item.title}</span>
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red add-to-cart" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
          </div>
          <div className="card-content">
            <p><b>Price: {item.price}$</b></p>
          </div>
          {item.inventory === 0 && <div className="alert alert-danger center">Out of stock!</div>}
        </div>
      )
    })
    return (
      <div className="container">
        <div className="box mt-20">
          {itemList}
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home) 
