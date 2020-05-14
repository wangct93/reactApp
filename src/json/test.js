import {loop, random} from "wangct-util";

export const shopList = loop(10,(index) => ({
  id:index,
  cover:'https://fuss10.elemecdn.com/0/77/64237a0feace7b5d73841c825f2f0png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
  name:'串意十足烧烤店（康康谷店）',
  score:4.4,
  sold_num:6540,
  qsf:20,
  psf:2.5,
  distance:2.3,
  time:40,
  label:['烧烤','品质联盟'],
  yh:[
    {
      title:'满49减28，满88减40，满128减46，满168减60，满218减68',
    },
    {
      title:'特价商品0.1元起',
    },
  ]
}));

/**
 * 商品列表
 * @type {{children: [{title: string, desc: string}], title: string}[]}
 */
export const goodsList = loop(20,(i) => {
  return {
    title:'热销' + i,
    children:loop(5,(index) => {
      return {
        id:i * 20 + index,
        cover:'https://fuss10.elemecdn.com/0/77/64237a0feace7b5d73841c825f2f0png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        name:'豪华商务单人餐',
        monthSellNum:6,
        price:30,
        desc:random(),
      };
    }),
  };
});
