import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../App';

describe('<App />', () => {
  it('renders a div with a class .App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.App')).to.have.lengthOf(1);
  });

  it('renders one <BrowserRouter /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(BrowserRouter)).to.have.lengthOf(1);
  });

  it('renders one <Switch /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Switch)).to.have.lengthOf(1);
  });

  it('renders three <Route /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Route)).to.have.lengthOf(4);
  });
});
