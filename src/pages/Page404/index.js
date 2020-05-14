import React from 'react';
import {DefineComponent} from "../../components";
import TopBar from "../../components/TopBar";
import {Button, Icon, Result} from "antd";
import {OrderInfo} from "../Shop/OrderView";
import css from './index.less';
import {toHome} from "../../utils/utils";

/**
 * 订单列表
 */
export default class Page404 extends DefineComponent {
  render() {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      className={css.container}
      extra={<Button type="primary" onClick={toHome}>Back Home</Button>}
    />
  }
}
