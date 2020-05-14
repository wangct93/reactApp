import React, {PureComponent} from 'react';
import css from './index.less';
import {Icon,Link} from "wangct-react";
import DefineComponent from "../DefineComponent";
import {history} from 'wangct-react-entry';

/**
 * 顶层栏
 */
export default class TopBar extends DefineComponent {

  state = {
    hasBack:true,
  };

  doBack = (e) => {
    const {onBack} = this.props;
    if(onBack){
      onBack(e);
    }else{
      history.goBack();
    }
  };

  getBackContent(){
    return this.getProp('hasBack') && <Icon onClick={this.doBack} type="left" />;
  }

  render() {
    return <div className={css.container}>
      {this.getBackContent()}
      {this.props.children}
    </div>
  }
}
