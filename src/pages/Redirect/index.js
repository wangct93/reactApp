import React from 'react';
import {DefineComponent} from "../../components";
import TopBar from "../../components/TopBar";
import {Button, Icon, Result} from "antd";
import {OrderInfo} from "../Shop/OrderView";
import css from './index.less';
import {toHome} from "../../utils/utils";

/**
 * 默认主页
 */
export default class Redirect extends DefineComponent {
  render() {
    toHome();
    return null;
  }
}
