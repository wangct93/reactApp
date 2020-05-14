import React, {PureComponent} from "react";
import css from "./Header.less";
import {Icon, Input} from "antd";
import {DefineComponent} from "../../components";

/**
 * 首页头部
 */
export default class Header extends DefineComponent {
  render() {
    return <div className={css.container}>
      <div className={css.text_city}>
        <span>杭州</span>
        <Icon type="down" />
      </div>
      <div className={css.search_box}>
        <Input icon="search" />
      </div>
      <div className={css.user_box}>
        <Icon type="user" />
      </div>
    </div>
  }
}
