import React from 'react';
import {DefineComponent} from "../../components";
import TopBar from "../../components/TopBar";
import {Icon} from "antd";
import {OrderInfo} from "../Shop/OrderView";
import css from './index.less';

/**
 * 订单列表
 */
export default class OrderList extends DefineComponent {
  render() {
    return <div className={css.container}>
      <div className={css.header}>订单</div>
      <div className={css.body}>
        <div className={css.title}>我的订单</div>
        <div className={css.list}></div>
      </div>
    </div>
  }
}
