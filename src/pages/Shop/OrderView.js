import DefineComponent from "../../components/DefineComponent";
import React from "react";
import css from './OrderView.less';
import {Img,Portal} from 'wangct-react';
import TestImg from '../../assets/images/kendeji.jpg';
import {classNames, strEqual, loop, callFunc, toNum, toAry} from "wangct-util";
import {Checkbox, Icon, Radio, Tabs} from "antd";
import {goodsList} from "../../json/test";
import {dispatch, reduxConnect, getState, pathTo} from "wangct-react-entry";
import Line from "../../components/Line";
import TopBar from "../../components/TopBar";

/**
 * 提交订单界面
 */
export default class OrderView extends DefineComponent {

  state = {
    selectedIndex:0,
  };

  doBack(){
    dispatch({
      type:'shop/toShop',
    });
  }

  render() {
    return <div className={css.container}>
      <TopBar onBack={this.doBack}>
        <div className={css.page_title}>提交订单</div>
      </TopBar>
      <Delivery />
      <OrderInfo />
      <FloatBar />
    </div>
  }
}

class Delivery extends DefineComponent {
  render() {
    return <div className={css.delivery_box}>
      <Tabs
        className={css.delivery_content}
      >
        <Tabs.TabPane key={0} tab="外卖配送">
          <div className={css.line}>
            <div className={css.left}>
              <div className={css.text_addr}>湘云雅苑</div>
              <div className={css.text_userinfo}>王（先生） 12345678912</div>
            </div>
            <Icon type="right" />
          </div>
          <div className={css.line}>
            <div>立即送出</div>
            <div className={css.right}>
              <span className={css.text_warning}>大约21:22送达</span>
            </div>
            <Icon type="right" />
          </div>
          <div className={css.line_alert}>
            <span className={css.text_warning}>为减少接触，封闭管理时</span>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key={1} tab="到店自取">
          <div>到店自取</div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  }
}

export class OrderInfo extends DefineComponent {
  render() {
    return <div className={classNames(css.order_info,this.props.className)}>
      <div className={css.shop_title}>
        <span className={css.text_title}>叫了只炸鸡（杭州总店）</span>
        <span className={css.mt_label}>美团快送</span>
      </div>
      <div>
        <div className={css.goods_item}>
          <Img src={TestImg} className={css.goods_img} />
          <div className={css.goods_info}>
            <div>薯你美（配一包番茄酱）</div>
            <div>x1</div>
          </div>
          <div>¥9.9</div>
        </div>
        <div className={css.goods_item}>
          <Img src={TestImg} className={css.goods_img} />
          <div className={css.goods_info}>
            <div>薯你美（配一包番茄酱）</div>
            <div>x1</div>
          </div>
          <div>¥9.9</div>
        </div>
      </div>
      <Line className={css.line}>
        <div>包装费</div>
        <div>¥2</div>
      </Line>
      <Line className={css.line}>
        <div>配送费</div>
        <div>¥2</div>
      </Line>
      <Line className={css.line}>
        <div>配送费</div>
        <div>¥2</div>
      </Line>
    </div>
  }
}

class FloatBar extends DefineComponent {

  doSubmit(){
    pathTo('/finish-order');
  }

  render() {
    return <div className={css.float_bar}>
      <div className={css.price_box}>
        <div>¥19</div>
        <div>已优惠¥6.8</div>
      </div>
      <div className={css.other_pay}>找人付</div>
      <div className={css.submit_order} onClick={this.doSubmit}>提交订单</div>
    </div>
  }
}
