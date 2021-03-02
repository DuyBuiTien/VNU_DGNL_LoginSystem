import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataApp: null,
  dataService: null,
  XacThucVanTay: false,
  isLoadIntro: false,

  fcmToken: null,
  AccessToken: '',
  refreshToken: '',
  basicAuth: '',
  user: null,
  username_tmp: '',
  password_tmp: '',
  CurrentPosition: null,
  CurrentLocation: null,

  avatarUrl: '',

  listLoading: false,
  actionsLoading: false,

  actionsLoadingDonVi: false,

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

export const globalSlice = createSlice({
  name: 'global',
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

    catchErrorDonVi: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      state.actionsLoadingDonVi = false;
    },
    startCallDonVi: (state, action) => {
      state.error = null;
      state.actionsLoadingDonVi = true;
    },

    // dataDonViFetched
    dataDonViFetched: (state, action) => {
      const {dataApp, dataService} = action.payload;

      state.actionsLoadingDonVi = false;
      state.error = null;
      state.dataApp = dataApp;
      state.dataService = dataService;
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

    getAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
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
      state.actionsLoading = false;
      state.error = null;
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
      if (!state.XacThucVanTay) {
        state.password_tmp = '';
      }
    },
  },
});
