import {constant} from '../../utils/constants';

export function changeCount(count, price) {
  return {
    type: constant.COUNTER_CHANGE,
    payload: count,
    price: price,
  };
}
export function selectedCatChange(cat) {
  return {
    type: constant.SELECTED_CAT,
    payload: cat,
  };
}
export function itemAdded(list) {
  return {
    type: constant.ADDTOCART,
    payload: list,
  };
}
export function allOrdersAdd(list) {
  return {
    type: constant.ALLORDERS,
    payload: list,
  };
}
