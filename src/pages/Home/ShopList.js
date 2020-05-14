import React, {PureComponent} from "react";
import css from "./ShopList.less";
import {Icon, Input, Rate} from "antd";
import {DefineComponent} from "../../components";
import {pathTo, reduxConnect} from "wangct-react-entry";
import {Link} from "wangct-react";
import * as homeApi from "../../api/home";

/**
 * 门店列表
 */
export default class ShopList extends DefineComponent {
  state = {
    loadOptions:homeApi.getShopList,
  };

  componentDidMount() {
    this.loadOptions();
  }

  shopClick(shop){
    pathTo('/shop/' + shop.id);
  }

  render() {
    return <ul className={css.shop_list}>
      {
        this.getOptions().map((item,index) => {
          return <li onClick={this.shopClick.bind(this,item)} key={index}>
            <div className={css.cover}>
              <img src={item.cover} alt={'wd'} />
            </div>
            <div className={css.shop_info}>
              <h2>{item.name}</h2>
              <div>
                <Rate value={item.score} size={"small"} />
                <span>{item.score}</span>
                <span>月售{item.sold_num}单</span>
              </div>
              <div>
                <span>￥{item.qsf}起送 |</span>
                <span>配送费￥{item.psf}</span>
                <span>{item.distance} | {item.time} 分钟</span>
              </div>
              <div>
                {
                  item.label.map((label,index) => {
                    return <span key={index}>{label}</span>
                  })
                }
              </div>
              <div>
                {
                  item.yh.map((yh,index) => {
                    return <div key={index}>
                      <span>减</span>
                      <span>{yh.title}</span>
                    </div>
                  })
                }
              </div>
            </div>
          </li>
        })
      }
    </ul>
  }
}
