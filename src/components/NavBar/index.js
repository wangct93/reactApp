import React, {PureComponent} from 'react';
import css from './index.less';
import {Icon,Link} from "wangct-react";
import DefineComponent from "../DefineComponent";
import {reduxConnect} from "wangct-react-entry";
import {classNames} from "wangct-util";

/**
 * 导航栏
 */
@reduxConnect(({global}) => ({
  pathname:global.pathname,
}))
export default class NavBar extends DefineComponent {

  state = {};

  render() {
    return <div className={css.container}>
      {
        this.getOptions().map(menu => {
          const active = this.props.pathname.startsWith(menu.path);
          return <Link to={menu.path} key={menu.title} className={classNames(css.item,active && css.active)}>
            <div className={css.icon_box}>
              <Icon type="user" />
            </div>
            <div className={css.text_title}>{menu.title}</div>
          </Link>
        })
      }
    </div>
  }
}
