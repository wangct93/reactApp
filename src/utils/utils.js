import {history, pathTo} from 'wangct-react-entry';

/**
 * 回退
 * @returns {*}
 */
export function goBack(){
  return history.goBack();
}

export function initState(){

}

/**
 * 返回主页
  */
export function toHome(){
  pathTo('/home');
}
