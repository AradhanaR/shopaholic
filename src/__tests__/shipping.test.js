import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import cartReducer from '../reducers/cartReducer';
import Shipping from '../components/shipping';

import { Provider } from 'react-redux';
const store = createStore(cartReducer);
let wrapper

describe('<Cart />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Shipping store={store} />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a div with a class .shipping-box', () => {
    expect(wrapper.find('.shipping-box')).to.have.lengthOf(1);
  });

  it('simulates click events', () => {
    wrapper.find('#check-shipping').simulate('change', { target: { checked: true } });
    expect(wrapper.find('Shipping').props().total).to.equal(100);
  });
});
