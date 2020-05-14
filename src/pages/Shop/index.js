import React from 'react';

import css from './index.less';
import {DefineComponent} from "../../components";
import GoodsView from "./GoodsView";
import {Icon} from "antd";
import {Tabs} from 'wangct-react';
import {goodsList} from "../../json/test";
import {dispatch, reduxConnect} from "wangct-react-entry";
import {goBack} from "../../utils/utils";
import OrderView from "./OrderView";
import {ShopTabKeys} from "../../json/dic";

/**
 * 门店
 */
@reduxConnect(({shop}) => ({
  tabKey:shop.tabKey,
}))
export default class Shop extends DefineComponent {

  state = {
    tabOptions:[
      {
        title:ShopTabKeys.shop,
        component:ShopView,
      },
      {
        title:ShopTabKeys.order,
        component:OrderView,
      }
    ],
  };

  componentDidMount() {
    dispatch({
      type:'shop/update',
      field:'shopId',
      data:this.props.match.params.id,
    })
  }

  componentWillUnmount() {
    dispatch({
      type:'shop/update',
      field:'shopId',
    })
  }

  render() {
    const {state,props} = this;
    return <Tabs className={css.tabs} value={props.tabKey} usePath={false} options={state.tabOptions} />;
  }
}

class ShopView extends DefineComponent {

  state = {
    tabOptions:[
      {
        title:'点菜',
        component:GoodsView,
        props:{
          options:goodsList,
        }
      },
      {
        title:'评价',
        component:GoodsView,
        props:{
          options:goodsList,
        }
      },
      {
        title:'商家',
        component:GoodsView,
        props:{
          options:goodsList,
        }
      }
    ],
  };

  render() {
    const {state} = this;
    return <div className={css.container}>
      <Header />
      <ShopInfo/>
      <div className={css.tabs_box}>
        <Tabs usePath={false} options={state.tabOptions} />
      </div>
    </div>;
  }
}

/**
 * 头部
 */
class Header extends DefineComponent {

  render() {
    return <div className={css.header}>
      <div className={css.left}>
        <Icon onClick={goBack} type="left" />
      </div>
      <div className={css.right}>
        <Icon type="search" />
        <Icon type="search" />
        <Icon type="search" />
        <Icon type="search" />
      </div>
    </div>
  }
}

/**
 * 门店信息
 */
class ShopInfo extends DefineComponent {
  render() {
    return <div className={css.shop_info}>
      <h2>与你说酸菜鱼（萧山）</h2>
      <div className={css.label_box}>

      </div>
    </div>
  }
}
