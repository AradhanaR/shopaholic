import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Cart from './components/cart';
import Shipping from './components/shipping';
import Checkout from './components/checkout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
