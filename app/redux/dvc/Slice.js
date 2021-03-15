import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: '',
  username: '',
  password: '',

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

export const dvcSlice = createSlice({
  name: 'dvc',
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

    loginSuccess: (state, action) => {
      state.actionsLoading = false;
      state.error = null;

      const payload = action.payload;

      state.user = payload;
      state.token = payload.token;
      state.username = payload.username;
      state.password = payload.password;
    },

    logOut: (state, action) => {
      state.token = '';
      state.user = null;
      state.username = '';
      state.password = '';
    },
  },
});
