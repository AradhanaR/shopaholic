import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';

const Navbar = () => {
  const addedItems = useSelector(state => state.addedItems);

  return (
    <nav className="nav-wrapper nav-bg">
      <div className="container">
        <Link to="/" className="brand-logo"><img src={logo} alt="baggie" className="brand-logo-new " /></Link>

        <ul className="right">
          <li><Link to="/">Shop</Link></li>
          <li><Link to="/cart">My cart</Link></li>
          <li>
            <Link to="/cart">
              <i className="material-icons material-icons-big">shopping_cart</i>
              {addedItems.length && <span className='badge cart-badge'>{addedItems.length}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;