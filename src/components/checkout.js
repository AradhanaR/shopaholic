import React, { Component } from 'react';
import { connect } from 'react-redux';


class Checkout extends Component {

  constructor(props) {
    super(props);

    this.state = { showSucess: false };
  }

  placeOrder = (e) => {
    this.props.clearCart();
    this.setState({
      showSucess: true
    })
  }

  render() {

    return (
      <div className="container checkout-container">
        {!this.state.showSucess &&
          <div>
            <h4>Order Summary</h4>
            <div className="card cart-bg collection">

              <li className="collection-item">
                <span><b>Address</b>: 542 W. 15th Street, New York, NY-10001  </span>
              </li>
              <li className="collection-item">
                <b>Amount Payable: {this.props.total.toFixed(2)} $</b>
              </li>
            </div>
            <div className="checkout">
              <button id="payment-btn" className="waves-effect waves-light btn" onClick={this.placeOrder}>Pay Now</button>
            </div>
          </div>
        }
        {this.state.showSucess &&
          <div className="card cart-bg">
            <div className="card-content">
              <p>Your order has been placed successfully, Expect delievery within 3-4 days!</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    total: state.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => { dispatch({ type: 'CLEAR_CART' }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)