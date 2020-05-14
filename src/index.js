import {render,getState} from 'wangct-react-entry';
import 'antd-mobile/dist/antd-mobile.css';

import './styles/global.less';

window.getState = getState;

render();
