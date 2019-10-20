import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import cartReducer from '../reducers/cartReducer';
import Cart from '../components/cart';
import Shipping from '../components/shipping';

import { Provider } from 'react-redux';
const store = createStore(cartReducer);
let wrapper

describe('<Cart />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart store={store} />
          <Switch>
            <Route path="/shipping" component={Shipping} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a div with a class .cart-box', () => {
    expect(wrapper.find('.cart-box')).to.have.lengthOf(1);
    expect(wrapper.find('h5').text()).to.be.equal('Shopping Cart:')
  });

  it('renders one <Shipping /> component', () => {
    expect(wrapper.find(Shipping)).to.have.lengthOf(1);
  });
});
