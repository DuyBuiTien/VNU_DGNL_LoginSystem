import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataWeather: null,
  dataWeatherDaily: null,
  dataWeatherHourly: null,
  dataAQI: null,

  listLoading: false,
  actionsLoading: false,

  totalCount: 0,
  entities: null,
  customerForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const otherSlice = createSlice({
  name: 'other',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    dataAQIFetched: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.dataAQI = action.payload;
    },
    // loginSuccess
    loginSuccess: (state, action) => {
      state.actionsLoading = false;
      state.error = null;

      const payload = action.payload;

      state.user = payload;
      state.AccessToken = payload.AccessToken;
      state.refreshToken = payload.refreshToken;
      state.basicAuth = payload.basicAuth;
      state.username_tmp = payload.username;
      state.password_tmp = payload.password;
    },

    XacThucVanTay: (state, action) => {
      state.XacThucVanTay = action.payload;
    },

    setLoadIntro: (state, action) => {
      state.isLoadIntro = action.payload;
    },

    saveCurrentPosition: (state, action) => {
      state.CurrentPosition = action.payload;
    },
    saveCurrentLocation: (state, action) => {
      state.CurrentLocation = action.payload;
    },
    setTokenFirebase: (state, action) => {
      state.fcmToken = action.payload;
    },
    logOut: (state, action) => {
      state.AccessToken = '';
      state.basicAuth = '';
      state.user = null;
      state.UserIdChat = '';
      state.refreshToken = '';
      state.password_tmp = '';
    },
  },
});
