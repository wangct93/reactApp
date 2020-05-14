import {ShopTabKeys} from "../json/dic";

const initState = {
  tabKey:ShopTabKeys.shop,
};

export default {
  namespace: 'shop',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    toShop,
    toOrder,
  },
};

function toShop(){
  return {
    tabKey:ShopTabKeys.shop,
  }
}

function toOrder(){
  return {
    tabKey:ShopTabKeys.order,
  }
}
