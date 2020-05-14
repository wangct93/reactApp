import {history} from 'wangct-react-entry';

const initState = {
  pathname:window.location.pathname,
  history,
};

export default {
  namespace: 'global',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {

  },
  subscriptions: {
    setup({ history,dispatch}) {
      history.listen((match) => {
        dispatch({
          type:'updateField',
          field:'pathname',
          data:match.pathname
        });
      });
    }
  },
};

