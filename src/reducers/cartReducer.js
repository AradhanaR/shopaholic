import Item1 from '../images/item1.jpg';
import Item2 from '../images/item2.jpg';
import Item3 from '../images/item3.jpg';
import Item4 from '../images/item4.jpg';
import Item5 from '../images/item5.jpg';
import Item6 from '../images/item6.jpg';

import { cloneDeep } from 'lodash';
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING, CLEAR_CART } from '../actions/action-types/cart-actions'


const initState = {
  items: [
    { id: 1, title: 'Face Berkeley', inventory: 5, price: 400, img: Item1 },
    { id: 2, title: 'Everlane Snap', inventory: 20, price: 200, img: Item2 },
    { id: 3, title: 'Millican Smith', inventory: 10, price: 290, img: Item3 },
    { id: 4, title: 'Eastpak J.Crew', inventory: 5, price: 230, img: Item4 },
    { id: 5, title: 'Rains Field', inventory: 10, price: 400, img: Item5 },
    { id: 6, title: 'Trakke Fingal', inventory: 5, price: 219, img: Item6 }
  ],
  addedItems: [],
  total: 0
};


const cartReducer = (state = cloneDeep(initState), action) => {
  let addedItem, existedItem, newTotal = 0, updatedItems;

  switch (action.type) {
    case ADD_TO_CART:
      addedItem = state.items.find(item => item.id === action.id);
      existedItem = state.addedItems.find(item => action.id === item.id);

      if (existedItem && addedItem.inventory > 0) {
        // update inventory
        updatedItems = state.items.map(i => {
          if (action.id === i.id)
            i.inventory--;
          return i;
        });
        addedItem.quantity += 1;
        return {
          ...state,
          items: updatedItems,
          total: state.total + addedItem.price
        }
      }
      else if (existedItem && addedItem.inventory <= 0) {
        return state;
      }
      else {
        addedItem.quantity = 1;
        // update inventory
        updatedItems = state.items.map(i => {
          if (action.id === i.id)
            i.inventory--;
          return i;
        });
        newTotal = state.total + addedItem.price;
        return {
          ...state,
          items: updatedItems,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal
        };
      }
    case REMOVE_ITEM:
      let itemToRemove = state.addedItems.find(item => action.id === item.id);
      let newItems = state.addedItems.filter(item => action.id !== item.id);

      newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);

      // restore inventory
      updatedItems = state.items.map(i => {
        if (action.id === i.id) {
          i.inventory = initState.items[action.id].inventory;
        }
        return i;
      });
      return {
        ...state,
        items: updatedItems,
        addedItems: newItems,
        total: newTotal
      };
    case SUB_QUANTITY:
      addedItem = state.items.find(item => item.id === action.id);
      // update inventory
      updatedItems = state.items.map(i => {
        if (action.id === i.id)
          ++i.inventory;
        return i;
      });

      if (addedItem.quantity === 1) {
        let newItems = state.addedItems.filter(item => item.id !== action.id);
        let newTotal = state.total - addedItem.price;
        return {
          ...state,
          items: updatedItems,
          addedItems: newItems,
          total: newTotal
        };
      }
      else {
        addedItem.quantity -= 1;
        let newTotal = state.total - addedItem.price;
        return {
          ...state,
          items: updatedItems,
          total: newTotal
        };
      }
    case ADD_QUANTITY:
      addedItem = state.items.find(item => item.id === action.id);

      if (addedItem.inventory > 0) {
        addedItem.quantity += 1;

        // update inventory
        updatedItems = state.items.map(i => {
          if (action.id === i.id)
            i.inventory--;
          return i;
        });
        newTotal = state.total + addedItem.price;
        return {
          ...state,
          items: updatedItems,
          total: newTotal
        };
      }
      return state;
    case ADD_SHIPPING:
      return {
        ...state,
        total: state.total + 100
      }
    case SUB_SHIPPING:
      return {
        ...state,
        total: state.total - 100
      }
    case CLEAR_CART:
      return {
        ...state,
        addedItems: [],
        total: 0
      }
    default:
      return state;
  }

}
export default cartReducer;