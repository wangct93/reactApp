import React from 'react';

import css from './index.less';
import Header from "./Header";
import ShopList from "./ShopList";
import MenuList from "./MenuList";
import {DefineComponent} from "../../components";

/**
 * 主页
 */
export default class Home extends DefineComponent {
  render() {
    return <div className={css.container}>
      <Header />
      <MenuList style={{marginBottom:'.1rem'}} />
      <div className={css.shop_wrap}>
        <div className={css.text_title}>猜你喜欢</div>
        <ShopList />
      </div>
    </div>
  }
}




