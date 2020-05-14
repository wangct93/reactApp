import DefineComponent from "../DefineComponent";
import {callFunc, classNames, isFunc, toAry} from "wangct-util";
import css from "./index.less";
import React from "react";
import {Drawer, Tabs} from "antd";
import {reduxConnect} from "wangct-react-entry";

/**
 * 行
 */
export default class Line extends DefineComponent {

  state = {
  };


  render() {
    const {props} = this;
    const content = toAry(this.props.children);
    return <div className={classNames(css.line,props.className)} style={props.style}>
      <div className={css.flex}>{content[0]}</div>
      {content.slice(1)}
    </div>
  }
}
