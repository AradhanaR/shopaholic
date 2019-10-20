import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Shipping extends Component {

  componentWillUnmount() {
    if (this.refs.shipping.checked)
      this.props.subShipping()
  }

  handleChecked = (e) => {
    if (e.target.checked) {
      this.props.addShipping();
    }
    else {
      this.props.subShipping();
    }
  }

  render() {

    return (
      <div className="container shipping-box">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input type="checkbox" id="check-shipping" ref="shipping" onChange={this.handleChecked} />
              <span>Shipping(+100$)</span>
            </label>
          </li>
          <li className="collection-item"><b>Total: {this.props.total.toFixed(2)} $</b></li>
        </div>
        <div className="checkout">
          <Link to="/checkout" className="waves-effect waves-light btn">Place Order</Link>
        </div>
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
    addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
    subShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping)