import DefineComponent from "../DefineComponent";
import {callFunc, classNames, isFunc, toAry} from "wangct-util";
import css from "./index.less";
import React from "react";
import {Drawer, Tabs} from "antd";
import {reduxConnect} from "wangct-react-entry";

/**
 * 标签页组件
 */
@reduxConnect(({global}) => ({
  pathname:global.pathname,
}))
export default class TabsMod extends DefineComponent {

  state = {
  };

  getActiveKey(){
    const options = this.getOptions();
    const target = options[this.getActiveIndex()];
    return target && target.path;
  }

  getActiveIndex(){
    const options = this.getOptions();
    const {pathname = ''} = this.props;
    return options.findIndex((opt) => {
      return pathname.startsWith(opt.path);
    });
  }

  render() {
    const activeIndex = this.getActiveIndex();
    return <Tabs
      className={css.container}
      activeKey={this.getActiveKey()}
    >
      {
        this.getOptions().map((opt,index) => {
          return <Tabs.TabPane key={opt.path} tab={opt.path}>
            <TabComMod props={opt.props} route={opt} destroy={index > activeIndex} />
          </Tabs.TabPane>
        })
      }
    </Tabs>
  }
}


class TabComMod extends DefineComponent {
  state = {
    hide:false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.checkDestroy(prevProps);
  }

  checkDestroy(prevProps){
    if(prevProps.destroy !== this.props.destroy){
      if(this.props.destroy){
        setTimeout(() => {
          this.setState({
            hide:true,
          });
        },300);
      }else{
        this.setState({
          hide:false,
        });
      }
    }
  }

  getData(){
    return this.props.route || {};
  }

  render() {
    if(this.state.hide){
      return null;
    }
    const {component:Com,props} = this.getData();
    const comProps = isFunc(props) ? props() : props;
    return <Com {...comProps} />;
  }
}
