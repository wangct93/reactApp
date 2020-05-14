const util = require('wangct-server-util');
const serverConfig = require('../server/config/server');

const {resolve} = util;

module.exports = {
  prod:{
    outputPublicPath:'/assets/',
  },
  html:'public/index.html',
  routes:[
    {
      path:'/finish-order',
      component:'FinishOrder',
    },
    {
      path:'/shop/:id',
      component:'Shop',
    },
    {
      path:'/',
      component:'Layout',
      children:[
        {
          path:'/order-list',
          component:'Page404'
        },
        {
          path:'/user-info',
          component:'Page404'
        },
        {
          path:'/found',
          component:'Page404'
        },
        {
          path:'/home',
          component:'Home'
        },
        {
          path:'/',
          component:'Redirect'
        }
      ]
    }
  ],
  dynamicImport:true,
  disableCssModules:[
    resolve('node_modules/wangct-react')
  ],
  proxy:{
    '/api/':getProxyAddress()
  }
};


function getProxyAddress(){
  return `http://${util.getLocalIp()}:${serverConfig.port}`
}
