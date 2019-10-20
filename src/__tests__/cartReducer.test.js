import cartReducer from '../reducers/cartReducer';
import Item1 from '../images/item1.jpg';
import Item2 from '../images/item2.jpg';
import Item3 from '../images/item3.jpg';
import { cloneDeep } from 'lodash';
import { expect } from 'chai';
const initState = {
  items: [
    { id: 1, title: 'TV', inventory: 2, price: 11500.01, img: Item1 },
    { id: 2, title: 'Fridge', inventory: 2, price: 11110.99, img: Item2 },
    { id: 3, title: 'Mobile', inventory: 2, price: 1119.99, img: Item3 }
  ],
  addedItems: [],
  total: 0
};

describe('Cart reducer', () => {
  it('should handle initial state', () => {
    expect(
      cartReducer(initState, {})
    ).to.equal(initState)
  })

  it('should handle ADD_TO_CART', () => {
    expect(
      cartReducer(initState, {
        type: 'ADD_TO_CART',
        id: 1
      }).addedItems
    ).to.deep.include(initState.items[0]);
  });

  it('should handle REMOVE_ITEM', () => {
    let currentState = cloneDeep(initState);
    currentState.addedItems.push(initState.items[0]);

    expect(
      cartReducer(currentState, {
        type: 'REMOVE_ITEM',
        id: 1
      }).addedItems
    ).to.not.deep.include(initState.items[0]);
  });

  it('should handle SUB_QUANTITY', () => {
    let currentState = cloneDeep(initState);
    currentState.addedItems.push(initState.items[0]);

    expect(
      cartReducer(currentState, {
        type: 'SUB_QUANTITY',
        id: 1
      }).addedItems
    ).to.be.an('array').that.is.empty;
  });

  it('should handle ADD_QUANTITY', () => {
    let currentState = cloneDeep(initState);
    currentState.addedItems.push(initState.items[0]);

    expect(
      cartReducer(currentState, {
        type: 'ADD_QUANTITY',
        id: 1
      }).addedItems
    ).to.be.an('array').that.is.not.empty;
  });

  it('should handle ADD_SHIPPING', () => {
    let currentState = cloneDeep(initState);

    expect(
      cartReducer(currentState, {
        type: 'ADD_SHIPPING',
        id: 1
      }).total
    ).to.be.equal(100);
  });

  it('should handle SUB_SHIPPING', () => {
    let currentState = cloneDeep(initState);
    currentState.addedItems.push(initState.items[0]);
    currentState.total = initState.items[0].price;

    expect(
      cartReducer(currentState, {
        type: 'SUB_SHIPPING',
        id: 1
      }).total
    ).to.be.equal(initState.items[0].price - 100);
  });

  it('should handle CLEAR_CART', () => {
    let currentState = cloneDeep(initState);

    expect(
      cartReducer(currentState, {
        type: 'CLEAR_CART'
      }).addedItems
    ).to.be.an('array').that.is.empty;

    expect(
      cartReducer(currentState, {
        type: 'CLEAR_CART'
      }).total
    ).to.be.equal(0);
  });

});
