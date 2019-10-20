import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import cartReducer from '../reducers/cartReducer';
import Navbar from '../components/Navbar';

import { Provider } from 'react-redux';
const store = createStore(cartReducer);
let wrapper

describe('<Cart />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar store={store} />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a div with a class .nav-wrapper', () => {
    expect(wrapper.find('.nav-wrapper')).to.have.lengthOf(1);
  });

  it('renders one <Link /> components', () => {
    expect(wrapper.find(Link)).to.have.lengthOf(4);
  });
});
