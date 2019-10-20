import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Shipping from '../components/shipping';
import { removeItem, addQuantity, subtractQuantity } from '../actions/cartActions';

const mapStateToProps = (state) => {
  return {
    items: state.addedItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => { dispatch(removeItem(id)) },
    addQuantity: (id) => { dispatch(addQuantity(id)) },
    subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
  }
}

class Cart extends Component {

  handleRemove = (id) => {
    this.props.removeItem(id);
  }

  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  }

  handleSubtractQuantity = (id) => {
    this.props.subtractQuantity(id);
  }

  render() {

    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (

          <li className="collection-item avatar" key={Math.floor(Math.random() * (100 - 1 + 1)) + 1}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>{item.desc}</p>
              <p><b>Price: {item.price}$</b></p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                {item.inventory > 0 && <Link to="/cart" className="add-item"><i className="material-icons" onClick={() => { this.handleAddQuantity(item.id) }}>arrow_drop_up</i></Link>}
                <Link to="/cart" className="sub-item"><i className="material-icons" onClick={() => { this.handleSubtractQuantity(item.id) }}>arrow_drop_down</i></Link>
              </div>
              {item.inventory === 0 && <div className="alert alert-danger center"><p>You have reached max capacity of this product stock</p> </div>}
              <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(item.id) }}>Remove</button>
            </div>

          </li>
        )
      })
    ) : (<p className="center empty-cart-box">Your cart is empty, <Link to="/">Shop here </Link></p>);

    return (
      <div className="container cart-box">
        <div className="cart">
          <h5>Shopping Cart:</h5>
          <ul className="collection">
            {addedItems}
          </ul>
        </div>
        <Shipping />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);