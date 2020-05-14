import React, {PureComponent} from 'react';
import {Header} from '../../components';

import css from './index.less';
import NavBar from "../../components/NavBar";
import {navBarMenus} from "../../json/options";

/**
 * 布局
 */
export default class Layout extends PureComponent {
  render() {
    return <div className={css.container}>
      <div className={css.content}>
        {
          this.props.children
        }
      </div>
      <NavBar options={navBarMenus} />
    </div>;
  }
}
