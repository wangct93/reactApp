import React from "react";
import {Icon} from "antd";
import {DefineComponent} from "../../components";
import {Link} from "wangct-react";
import {Carousel} from "antd-mobile";
import {homeMenus} from "../../json/options";
import {classNames, loop, random} from "wangct-util";
import css from './MenuList.less';
import {reduxConnect} from "wangct-react-entry";

/**
 * 菜单列表
 */
@reduxConnect(({global}) => ({
  resizeSign:global.resizeSign,
}))
export default class MenuList extends DefineComponent {

  state = {
    options:homeMenus,
    pageSize:10,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        _date:new Date(),
      })
    },100)

  }

  getOptions() {
    const {options = [],pageSize} = this.state;
    return loop(Math.ceil(options.length / pageSize),(index) => {
      return options.slice(index * pageSize,(index + 1) * pageSize);
    });
  }

  render() {
    const {props} = this;
    return <Carousel style={props.style} className={classNames(css.container,props.className)}>
      {
        this.getOptions().map((options,index) => {
          return <div className={css.menu_list} key={index}>
            {
              options.map((opt,index) => {
                const {path = '/' + random()} = opt;
                return <Link className={css.menu_item} to={path} key={index}>
                  <div className={css.icon_box}>
                    <Icon type="user" />
                  </div>
                  <div>{opt.title}</div>
                </Link>
              })
            }
          </div>
        })
      }
    </Carousel>
  }
}
