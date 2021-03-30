import * as requestFromServer from './Crud';
import {globalSlice, callTypes} from './Slice';
import store from '../store';

import MockData from '../../data/MockData.json';

const {actions} = globalSlice;

export const fetchDataDonVi = (URL) => (dispatch) => {
  dispatch(actions.startCallDonVi({callType: callTypes.action}));
  return requestFromServer
    .getDataDonVi(URL)
    .then((response) => {
      let dataApp_ = response.data?.dataApp ?? null;
      let dataService = response.data?.dataService ?? null;

      let dataModule = {};
      dataService.map((item) => {
        dataModule[item.serviceId] = item;
      });

      dispatch(actions.dataDonViFetched({dataApp: dataApp_, dataService: dataModule}));
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchErrorDonVi({error, callType: callTypes.action}));
    });
};

export const fetchDataDonVi_Demo = (URL) => (dispatch) => {
  let dataApp = MockData.dataApp ?? null;
  let dataService = MockData?.dataService ?? null;
  let dataMenu = MockData?.dataMenu ?? null;

  dispatch(actions.dataDonViFetched({dataApp: dataApp, dataService: dataService, dataMenu: dataMenu}));
};

export const login = (username, password) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  const dataService = state.global.dataService;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .Login(dataService.CD_URL, username, password)
    .then((response) => {
      if (response.data.data) {
        requestFromServer.LoginDichVu(dataService.BOOKMARK_URL, username, password);
        requestFromServer.LoginCungCau(dataService.KNCC_URL, username, password);

        let tmp = {...response.data.data};
        tmp.username = username;
        tmp.password = password;

        dispatch(actions.loginSuccess(tmp));
      } else {
        dispatch(actions.catchError({error: 'Đăng nhập không thành công', callType: callTypes.action}));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const GetUserInfo = () => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  const AccessToken = state.global.AccessToken;
  let serviceNotifi = dataApp?.serviceNotifi ?? '';

  return requestFromServer
    .GetUserInfo(serviceNotifi, AccessToken)
    .then((response) => {
      if (response && response.data && response.data.avatarUrl) {
        const url = `${serviceNotifi}/public/images/users/${response.data.avatarUrl}`;
        dispatch(actions.getAvatarUrl(url));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const setXacThucVanTay = (xacthucvantay) => (dispatch) => {
  return dispatch(actions.XacThucVanTay(xacthucvantay));
};
export const setLoadIntro = (isLoadintro) => (dispatch) => {
  return dispatch(actions.setLoadIntro(isLoadintro));
};

export const saveCurrentPosition = (CurrentPosition) => (dispatch) => {
  return dispatch(actions.saveCurrentPosition(CurrentPosition));
};

export const saveCurrentLocation = (latitude, longitude) => (dispatch) => {
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getLocation(latitude, longitude)
    .then((response) => {
      if (response && response.data && response.data.results) {
        dispatch(actions.saveCurrentLocation(response.data.results[0].formatted_address));
      }
      //dispatch(actions.dataDonViFetched({dataApp: dataApp_, dataService: dataModule}));
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};
export const setTokenFirebase = (token) => (dispatch) => {
  return dispatch(actions.setTokenFirebase(token));
};

export const logOut = () => (dispatch) => {
  return dispatch(actions.logOut());
};

export const uploadAvatar = (body) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceNotifi ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.action}));

  return requestFromServer
    .uploadAvatar(urlService, AccessToken, body)
    .then((response) => {
      if (response.data) {
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const setMenuFavor = (menus) => (dispatch) => {
  return dispatch(actions.setMenuCaNhan(menus));
};

export const setRandom = () => (dispatch) => {
  dispatch(actions.setRandom());
};
