import * as requestFromServer from './Crud';
import {otherSlice, callTypes} from './Slice';

const {actions} = otherSlice;

export const fetchAQI_old = (latitude, longitude) => (dispatch) => {
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getAQI(latitude, longitude)
    .then((response) => {
      if (response && response.data && response.data.data) {
        dispatch(actions.dataAQIFetched(response.data.data));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchErrorDonVi({error, callType: callTypes.action}));
    });
};

export const fetchAQI = (latitude, longitude) => (dispatch) => {
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getAQINEW(latitude, longitude)
    .then((response) => {
      if (response && response.data && response.data.data) {
        dispatch(actions.dataAQIFetched(response.data.data));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchErrorDonVi({error, callType: callTypes.action}));
    });
};

export const fetchLocation = (latitude, longitude) => (dispatch) => {
  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getLocation(latitude, longitude)
    .then((response) => {
      if (response && response.data && response.data.data) {
        dispatch(actions.dataAQIFetched(response.data.data));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find datadonvi";
      dispatch(actions.catchErrorDonVi({error, callType: callTypes.action}));
    });
};
