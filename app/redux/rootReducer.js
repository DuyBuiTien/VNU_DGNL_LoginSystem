import {combineReducers} from 'redux';

import {globalSlice} from './global/Slice';
import {otherSlice} from './other/Slice';
import {socialSlice} from './social/Slice';

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  other: otherSlice.reducer,
  social: socialSlice.reducer,
});
