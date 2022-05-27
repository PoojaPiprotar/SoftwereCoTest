import {constant} from '../../utils/constants';
import {global} from '../../utils/global';

const initialState = {
  count: 0,
  category: 'Vegetables',
  cat_list: global.veg_list,
  totalPrice: 0,
  allOrders: [],
};
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.COUNTER_CHANGE:
      return {
        ...state,
        count: action.payload,
        totalPrice: action.price,
      };
    case constant.SELECTED_CAT:
      return {
        ...state,
        category: action.payload,
        cat_list:
          action.payload === 'Vegetables'
            ? global.veg_list
            : action.payload === 'Fruits'
            ? global.fruit_list
            : global?.dairy_list,
      };
    case constant.ADDTOCART:
      return {
        ...state,
        cat_list: action.payload,
      };
    case constant.ALLORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    default:
      return state;
  }
};
export default countReducer;
