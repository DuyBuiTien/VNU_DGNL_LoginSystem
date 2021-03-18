import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',

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

export const diemtinSlice = createSlice({
  name: 'diemtin',
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

      state.token = payload;
    },

    
  },
});
