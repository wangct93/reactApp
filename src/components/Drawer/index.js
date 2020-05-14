import DefineComponent from "../DefineComponent";
import {callFunc, classNames, toAry} from "wangct-util";
import css from "./index.less";
import React from "react";
import {Drawer} from "antd";

/**
 * 抽屉组件
 */
export default class DrawerMod extends DefineComponent {

  state = {
    placement:'bottom',
    closable:false,
    height:'auto',
  };

  render() {
    const {props} = this;
    return <Drawer
      {...this.getProps()}
      className={classNames(css.wrap,props.className)}
    >
      {this.props.children}
    </Drawer>
  }
}
