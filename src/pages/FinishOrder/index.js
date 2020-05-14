import React from 'react';
import {DefineComponent} from "../../components";
import TopBar from "../../components/TopBar";
import {Icon} from "antd";
import {OrderInfo} from "../Shop/OrderView";
import css from './index.less';

/**
 * 主页
 */
export default class FinishOrder extends DefineComponent {
  render() {
    return <div className={css.container}>
      <TopBar/>
      <div className={css.content}>
        <div className={css.text_title}>订单已完成<Icon type="right" /></div>
        <div className={css.box}>
          <div>感谢您对本APP的信任，期待再次光临。</div>
          <MenuList />
        </div>
        <OrderInfo className={css.order_info} />
      </div>
    </div>
  }
}

class MenuList extends DefineComponent {

  state = {
    options:[
      {
        title:'申请退款',
        icon:'user',
      },
      {
        title:'打赏棋手',
        icon:'user',
      },
      {
        title:'再来一单',
        icon:'user',
      },
      {
        title:'评价得金豆',
        icon:'user',
      },
      {
        title:'致电商家',
        icon:'user',
      },
      {
        title:'致电骑手',
        icon:'user',
      },
    ]
  };

  render() {
    return <div className={css.menu_list}>
      {
        this.getOptions().map((opt,index) => {
          return <div key={index} className={css.menu_item}>
            <Icon type={opt.icon} />
            <div className={css.text_title}>{opt.title}</div>
          </div>
        })
      }
    </div>
  }
}




