import {strEqual} from "wangct-util";

const initState = {
  // 0:{
  //   list:[
  //     {
  //       id:0,
  //       num:20,
  //       price:20,
  //     }
  //   ],
  //   mapData:{
  //     0:{
  //       num:20,
  //     }
  //   }
  // },
};

export default {
  namespace: 'shopCart',
  state: initState,
  effects: {

  },

  reducers: {
    updateNum,
    clearCart,
  },
};

/**
 * 清空购物车
 * @param state
 * @param shopId
 * @returns {{}}
 */
function clearCart(state,{shopId}){
  return {
    [shopId]:null,
  };
}

/**
 * 更新数值
 * @param state
 * @param goodsId
 * @param num
 * @param shopId
 * @returns {{cartMap}}
 */
function updateNum(state,{goodsData,num,shopId}){
  const goodsId = goodsData.id;
  const {list = [],mapData = {}} = state[shopId] || {};
  const index = list.findIndex((item) => {
    return strEqual(item.id,goodsId);
  });
  const isExist = index !== -1;
  if(num){
    if(isExist){
      list[index].num = num;
    }else{
      list.push({
        ...goodsData,
        num,
      });
    }
  }else{
    list.splice(index,1);
  }

  return {
    [shopId]:{
      list:[...list],
      mapData:{
        ...mapData,
        [goodsId]:{
          ...mapData[goodsId],
          num,
        }
      }
    },
  };
}
