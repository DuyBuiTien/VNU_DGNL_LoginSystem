import * as requestFromServer from './Crud';
import {dvcSlice, callTypes} from './Slice';
import store from '../store';

const {actions} = dvcSlice;

export const login = (username, password) => (dispatch) => {
  let state = store.getState();
  const dataService = state.global.dataService;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .Login(dataService.DVC_URL, username, password)
    .then((response) => {
      console.log(response.data.data);
      if (response.data.data) {
        let tmp = {...response.data.data};
        tmp.username = username;
        tmp.password = password;

        dispatch(actions.loginSuccess(tmp));
      } else {
        dispatch(actions.catchError({error: 'Xác thực thất bại', callType: callTypes.action}));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const logOut = () => (dispatch) => {
  return dispatch(actions.logOut());
};
