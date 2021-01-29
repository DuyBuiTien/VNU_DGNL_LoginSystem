import * as requestFromServer from './Crud';
import {socialSlice, callTypes} from './Slice';
import store from '../store';
import getSocket from '../rootSocket';

const {actions} = socialSlice;

export const emitSentMessage = (payload) => {
  getSocket().emit('sent-message', payload);
};

export const onSentMessage = (payload) => {
  let state = store.getState();
  const {user} = state.global;
  const currentUser = user;

  return store.dispatch(actions.socketSendMessage({message: payload, currentUser: currentUser}));
};

export const setIdChat = (payload) => (dispatch) => {
  return dispatch(actions.setIdChat(payload));
};

export const fetchContactsChatGroup = () => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.list}));

  return requestFromServer
    .fetchContactsChatGroup(urlService, AccessToken)
    .then((response) => {
      const conversations = response.data;
      dispatch(actions.ContactsChatGroupFetched(conversations));
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch(actions.catchError({error, callType: callTypes.list}));
    });
};

export const fetchSearchUser = (keySearch, page, perpage) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.list}));

  return requestFromServer
    .searchUser(urlService, AccessToken, keySearch, page, perpage)
    .then((response) => {
      if (response && response.data && response.data.data) {
        const conversations = response.data.data;

        dispatch(actions.SearchUserFetched(conversations));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch(actions.catchError({error, callType: callTypes.list}));
    });
};

export const emptyDataSearch = () => (dispatch) => {
  return dispatch(actions.emptyDataSearch());
};

export const uploadPhoto = (body) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;
  const conversation = state.social.conversation;

  dispatch(actions.startCall({callType: callTypes.action}));

  return requestFromServer
    .uploadPhoto(urlService, AccessToken, body)
    .then((response) => {
      if (response.data) {
        let files = [];
        files.push({id: response.data.id});

        dispatch(
          sendMessage({
            files: files,
            type: 'image',
            receiver: conversation.receiver.id,
            conversationType: conversation.conversationType,
          }),
        );
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const uploadFile = (body) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;
  const conversation = state.social.conversation;

  dispatch(actions.startCall({callType: callTypes.action}));

  return requestFromServer
    .uploadFile(urlService, AccessToken, body)
    .then((response) => {
      if (response.data) {
        let files = [];
        files.push({id: response.data.id});

        dispatch(
          sendMessage({
            files: files,
            type: 'file',
            receiver: conversation.receiver.id,
            conversationType: conversation.conversationType,
          }),
        );
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const sendMessage = (message) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.action}));

  return requestFromServer
    .createMessage(urlService, AccessToken, message)
    .then((response) => {
      emitSentMessage(response.data);

      dispatch(actions.sendMessaged());
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const fetchContact = (type) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.list}));
  return requestFromServer
    .getContact(urlService, AccessToken, type)
    .then((response) => {
      if (response && response.data && response.data.data) {
        switch (type) {
          case 'contact':
            dispatch(actions.contactsFetched(response.data.data));
            break;
          case 'request':
            dispatch(actions.requestsFetched(response.data.data));
            break;
          case 'requestsent':
            dispatch(actions.requestsentsFetched(response.data.data));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find data";
      dispatch(actions.catchError({error, callType: callTypes.list}));
    });
};

export const fetchConversations = () => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.list}));
  return requestFromServer
    .getConversations(urlService, AccessToken)
    .then((response) => {
      if (response && response.data) {
        dispatch(actions.conversationsFetched(response.data.filter((item) => item != null)));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find data";
      dispatch(actions.catchError({error, callType: callTypes.list}));
    });
};

export const fetchConversation = (id, skip = 0, limit = 20) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  if (!id) {
    return dispatch(actions.conversationFetched({conversation: undefined}));
  }

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .getConversation(urlService, AccessToken, id, skip, limit)
    .then((response) => {
      const product = response.data;

      dispatch(actions.conversationFetched({conversation: product, skip: skip, urlService: urlService}));
    })
    .catch((error) => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const huyKetBan = (id) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .HuyContact(urlService, AccessToken, id)
    .then((response) => {
      dispatch(actions.huyKetBan({id}));
    })
    .catch((error) => {
      error.clientMessage = 'Không thể hủy kết bạn';
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const dongyKetBan = (id) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .DongYContact(urlService, AccessToken, id)
    .then((response) => {
      dispatch(actions.dongyKetBan({id}));
    })
    .catch((error) => {
      error.clientMessage = 'Không thể hủy kết bạn';
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};

export const themBan = (username) => (dispatch) => {
  let state = store.getState();
  const dataApp = state.global.dataApp;
  let urlService = dataApp?.serviceChat ?? '';
  const AccessToken = state.global.AccessToken;

  dispatch(actions.startCall({callType: callTypes.action}));
  return requestFromServer
    .ThemContact(urlService, AccessToken, username)
    .then((response) => {
      dispatch(actions.themBan({username}));
    })
    .catch((error) => {
      error.clientMessage = 'Không thể hủy kết bạn';
      dispatch(actions.catchError({error, callType: callTypes.action}));
    });
};
