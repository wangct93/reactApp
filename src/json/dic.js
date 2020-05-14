/**
 * 字段列表
 * @type {{}}
 */
import {aryToObj, toAry} from "wangct-util";

export const Fields = {

};

/**
 * 路由地址
 * @type {{found: string, my: string, home: string, order: string}}
 */
export const RouterPaths = {
  my:'/my',
  home:'/home',
  found:'/found',
  order:'/order',
  type:'/type'
};

/**
 * 门店选项卡字典
 * @type {*}
 */
export const ShopTabKeys = getDic(['shop','order']);

/**
 * 获取字典
 * @param options
 * @returns {*}
 */
function getDic(options){
  return aryToObj(toAry(options),(item) => {
    return item.split('=')[0];
  },(item,index) => {
    const value = item.split('=')[1];
    return value ? value : index + '';
  });
}
