import {combineReducers} from 'redux';

import {globalSlice} from './global/Slice';
import {dvcSlice} from './dvc/Slice';
import {otherSlice} from './other/Slice';
import {socialSlice} from './social/Slice';
import {diemtinSlice} from './diemtin/Slice';

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  dvc: dvcSlice.reducer,
  other: otherSlice.reducer,
  social: socialSlice.reducer,
  diemtin: diemtinSlice.reducer,
});
