import * as requestFromServer from './Crud';
import {diemtinSlice, callTypes} from './Slice';
import store from '../store';

const {actions} = diemtinSlice;

export const login = () => (dispatch) => {
  let state = store.getState();
  const dataService = state.global.dataService;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .Login(dataService.NETVIEW_URL)
    .then((response) => {
      if (response.data.data) {
        let tmp = response.data.data
        dispatch(actions.loginSuccess(tmp));
      } else {
        dispatch(actions.catchError({error: 'Xác thực Netview thất bại', callType: callTypes.action}));
      }
    })
    .catch((error) => {
      error.clientMessage = "Xác thực Netview thất bại";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const logOut = () => (dispatch) => {
  return dispatch(actions.logOut());
};
