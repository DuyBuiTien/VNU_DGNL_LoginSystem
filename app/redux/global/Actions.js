import {Base64} from 'js-base64';

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
  const {serviceGetway, tokenGetway} = dataApp;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .Login(serviceGetway, tokenGetway, username, password)
    .then((response) => {
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      const dataU = accessToken.split('.')[1];

      let decode_data = Base64.decode(dataU);
      let dataUser_ = JSON.parse(decode_data);

      let dataUser = dataUser_.context.user;

      const fullName = dataUser.displayName ? dataUser.displayName : username;
      const token = accessToken ? accessToken : '';

      const avatar = dataUser.avatar ? dataUser.avatar : '';
      const birthday = dataUser.birthday ? dataUser.birthday : '';
      const address = dataUser.address ? dataUser.address : '';
      const sex = dataUser.sex ? dataUser.sex : '';
      const phoneNumber = dataUser.phoneNumber ? dataUser.phoneNumber : '';
      const email = dataUser.email ? dataUser.email : '';

      const credentials = Base64.btoa(username + ':' + password);
      const basicAuth = 'Basic ' + credentials;

      dispatch(
        actions.loginSuccess({
          username: username,
          password: password,
          basicAuth: basicAuth,
          AccessToken: token,
          refreshToken: refreshToken,
          avatar: avatar,
          fullName: fullName,
          birthday: birthday,
          address: address,
          sex: sex,
          phoneNumber: phoneNumber,
          email: email,
        }),
      );

      /* requestFromServer.GetUserInfo(serviceNotifi, token).then((re_) => {
        if (re_ && re_.data && re_.data.avatarUrl) {
          console.log('re_.data.avatarUrl');
          console.log(re_.data.avatarUrl);
          dispatch(actions.getAvatarUrl(re_.data.avatarUrl));
        }
      }); */

      // dispatch(actions.dataDonViFetched({dataApp: dataApp_, dataService: dataModule}));
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
