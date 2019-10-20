import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import cartReducer from '../reducers/cartReducer';
import Home from '../components/home';

const store = createStore(cartReducer);

describe('<Home />', () => {

  it('renders a div with a class .container', () => {
    const wrapper = mount(<Provider store={store}><Home /></Provider>);
    expect(wrapper.find('.container')).to.have.lengthOf(1);
    wrapper.unmount();
  });

  it('simulates add to cart event', () => {
    const wrapper = mount((
      <Provider store={store}><Home /></Provider>
    ));
    wrapper.find('.add-to-cart').first().simulate('click');
    expect(wrapper.find('Home').props().addedItems).to.deep.include(wrapper.find('Home').props().items[0]);
    wrapper.unmount();
  });
});
