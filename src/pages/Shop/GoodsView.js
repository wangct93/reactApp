import DefineComponent from "../../components/DefineComponent";
import React from "react";
import css from './GoodsView.less';
import {Img,Portal} from 'wangct-react';
import TestImg from '../../assets/images/kendeji.jpg';
import {classNames, strEqual, loop, callFunc, toNum, toAry} from "wangct-util";
import {Checkbox, Icon, Radio} from "antd";
import {goodsList} from "../../json/test";
import {dispatch, reduxConnect,getState} from "wangct-react-entry";
import Drawer from "../../components/Drawer";
import {ShopTabKeys} from "../../json/dic";

/**
 * 商品列表
 */
export default class GoodsView extends DefineComponent {

  state = {
    selectedIndex:0,
  };

  getLeftContent(options){
    const {selectedIndex} = this.state;
    return <div className={css.left}>
      {
        options.map((opt,index) => {
          const selected = strEqual(selectedIndex,index);
          return <div onClick={this.leftItemClick.bind(this,index)} key={index} className={classNames(css.left_item,selected && css.selected)}>{opt.title}</div>;
        })
      }
    </div>
  }

  leftItemClick = (index) => {
    const elem = this.getElem();
    const diffHeight = elem.children[index].getBoundingClientRect().top - elem.getBoundingClientRect().top;
    elem.scrollTop = elem.scrollTop + diffHeight;
  };

  rightScroll = (e) => {
    const elem = e.target;
    const elemTop = elem.getBoundingClientRect().top;
    const index = Array.from(elem.children).findIndex((child) => {
      return child.getBoundingClientRect().top > elemTop + 1;
    });
    this.setState({
      selectedIndex:index === -1 ? elem.children.length - 1 : index - 1,
    });
  };

  getRightContent(options){
    return <div ref={this.setElem} onScroll={this.rightScroll} className={css.right}>
      {
        options.map((opt,index) => {
          return <div className={css.right_block} key={index}>
            <div className={css.text_title}>{opt.title}</div>
            <div className={css.right_content}>
              {
                <GoodsList options={opt.children} />
              }
            </div>
          </div>
        })
      }
    </div>
  }

  render() {
    const options = this.getOptions();
    return <div className={css.container}>
      <div className={css.content}>
        {
          this.getLeftContent(options)
        }
        {
          this.getRightContent(options)
        }
      </div>
      <ShoppingCart />
    </div>
  }
}

/**
 * 商品列表
 */
@reduxConnect(({shop}) => ({
  cartMap:getCartMapData().mapData,
  shopId:shop.shopId,
}))
class GoodsList extends DefineComponent {
  state = {};

  render() {
    return <div className={css.goods_list}>
      {
        this.getOptions().map((item,index) => {
          return <GoodsItemView key={index} data={item} />;
        })
      }
    </div>
  }
}

class BtnBox extends DefineComponent {

  doMins = () => {
    callFunc(this.props.onChange,this.getValue() - 1);
  };

  doPlus = () => {
    callFunc(this.props.onChange,this.getValue() + 1);
  };

  getValue(){
    return toNum(this.getProp('value'));
  }

  render() {
    const value = this.getValue();
    return <div className={css.btn_box}>
      {
        !!value && <React.Fragment>
          <div onClick={this.doMins} className={css.btn}>
            <span>-</span>
          </div>
          <div className={css.text_btn}>{value}</div>
        </React.Fragment>
      }
      <div onClick={this.doPlus} className={classNames(css.btn,css.plus)}>
        <span>+</span>
      </div>
    </div>
  }
}

@reduxConnect(({shop}) => ({
  list:getCartMapData().list,
  visible:shop.tabKey === ShopTabKeys.shop,
}))
class ShoppingCart extends DefineComponent {

  state = {
    modalVisible:false,
  };

  modalVisibleChange = (visible) => {
    this.setState({
      modalVisible:visible,
    });
  };

  changeModalVisible = () => {
    this.modalVisibleChange(!this.state.modalVisible);
  };

  getList(){
    return this.getProp('list') || [];
  }

  getPrice(){
    return this.getList().reduce((pv,item) => pv + item.price * item.num,0);
  }

  hasSelect(){
    return !!this.getList().length;
  }

  closeDrawer = () => {
    this.setState({
      modalVisible:false,
    });
  };

  doPay = (e) => {
    dispatch({
      type:'shop/toOrder'
    });
    e.stopPropagation();
  };

  render() {
    const {state} = this;
    const price = this.getPrice();
    const hasSelect = this.hasSelect();
    if(!this.props.visible){
      return null;
    }
    return <Portal>
      <div className={css.shopping_cart}>
        {
          !state.modalVisible && <div className={css.text_title}>满30减3</div>
        }
        <div onClick={this.changeModalVisible} className={css.shopping_cart_content}>
          <div className={css.contact_store}>
            <Icon type="user" />
          </div>
          <div className={css.shopping_sep} />
          <div className={css.plain_box}>
            {
              hasSelect && <div>¥{price}</div>
            }
            <div>另需配送费¥0.5 | 支持自取</div>
          </div>
          {
            hasSelect ? <div onClick={this.doPay} className={css.pay_btn}>去结算</div> : <div className={css.text_right}>¥0元起送</div>
          }
        </div>
        <CartDrawer visible={state.modalVisible} onClose={this.closeDrawer} />
      </div>
    </Portal>
  }
}

/**
 * 购物车对话框
 */
@reduxConnect(() => ({
  list:getCartMapData().list,
}))
class CartDrawer extends DefineComponent {

  state = {
    packNum:2,
  };

  getList(){
    return toAry(this.props.list);
  }

  render() {
    const {props} = this;
    return <Drawer
      visible={props.visible}
      onClose={props.onClose}
      className={css.drawer_wrap}
    >
      <div className={css.cart_wrap}>
        <div className={css.text_title}>满30减3</div>
        <div className={css.cart_content}>
          <div className={css.pack_header}>
            <span>选中商品</span>
            <span>（包装费<span style={{color:'red'}}>¥2</span><Icon type="request" />）</span>
            <div className={css.pack_clear_box}>
              <Icon type="user" />
              <span>清空购物车</span>
            </div>
          </div>
          <div className={css.pack_goods_list}>
            {
              this.getList().map((item,index) => {
                return <GoodsItemView key={index} data={item} />;
              })
            }
          </div>
        </div>
      </div>
    </Drawer>
  }
}

@reduxConnect(({shop},{data = {}}) => {
  const {mapData = {}} = getCartMapData();
  const numData = mapData[data.id];
  return {
    num:numData && numData.num,
    shopId:shop.shopId,
  };
})
class GoodsItemView extends DefineComponent {

  numChange = (num) => {
    dispatch({
      type:'shopCart/updateNum',
      shopId:this.props.shopId,
      goodsData:this.getData(),
      num,
    });
  };

  getCartNum(){
    return this.props.num;
  }

  render() {
    const data = this.getProp('data');
    return <div className={css.goods_item}>
      <div className={css.img_box}>
        <Img src={data.cover} />
      </div>
      <div className={css.info_box}>
        <div className={css.text_name}>{data.name}</div>
        <div className={css.text_desc}>{data.desc}</div>
        <div className={css.action_box}>
          <div className={css.price_box}>
            <span>￥{data.price}</span>
          </div>
          <BtnBox value={this.getCartNum()} onChange={this.numChange} />
        </div>
      </div>
    </div>
  }
}

export function stopPropagation(e){
  return e.stopPropagation && e.stopPropagation();
}

function getCartMapData(shopCart,shop){
  if(!shopCart){
    const state = getState();
    shopCart = state.shopCart;
    shop = state.shop;
  }
  return shopCart[shop.shopId] || {};
}
