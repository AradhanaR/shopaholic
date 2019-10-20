import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import cartReducer from '../reducers/cartReducer';
import Checkout from '../components/checkout';

import { Provider } from 'react-redux';
const store = createStore(cartReducer);
let wrapper

describe('<Cart />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout store={store} />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a div with a class .checkout-container', () => {
    expect(wrapper.find('.checkout-container')).to.have.lengthOf(1);
  });

  it('simulates pay now feature', () => {
    wrapper.find('#payment-btn').simulate('click');
    expect(wrapper.find('Checkout').state('showSucess')).to.equal(true);
  });
});
