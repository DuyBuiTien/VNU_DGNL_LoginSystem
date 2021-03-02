import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  searchContacts: [],
  listContacts: [],
  listRequests: [],
  listRequestsents: [],
  searchUser: [],

  conversations: [],
  conversation: null,
  messages: [],
  inputMessage: {
    images: [],
    text: '',
    files: [],
  },

  idChat: null,

  listLoading: false,
  actionsLoading: false,
  hasMoreConversation: true,

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

export const socialSlice = createSlice({
  name: 'social',
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
    contactsFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.listContacts = action.payload;
    },
    requestsFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.listRequests = action.payload;
    },
    requestsentsFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.listRequestsents = action.payload;
    },
    conversationsFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.conversations = action.payload;
    },
    conversationFetched: (state, action) => {
      state.actionsLoading = false;
      let payload = action.payload;

      if (payload && payload.skip && payload.conversation) {
        // Nếu cuộc trò chuyện là 0 => hết data
        if (payload.conversation.messages.length === 0) {
          state.hasMoreConversation = false;
        } else {
          state.conversation.messages = _.uniqWith(payload.conversation.messages.concat(state.conversation.messages), _.isEqual);
        }
      } else {
        if (payload && payload.conversation) {
          state.conversation = payload.conversation;
        }
      }

      // state.conversation = action.payload.conversation;
      state.error = null;
    },

    socketSendMessage: (state, action) => {
      let payload = action.payload;
      let message = payload.message;
      let currentUser = payload.currentUser;

      // Nếu tin nhắn đang mở thì thêm vào tin nhắn

      try {
        if (
          (state.conversation &&
            state.conversation.conversationType === 'User' &&
            state.conversation.receiver &&
            message.senderId &&
            message.receiverId &&
            state.conversation.receiver.id === message.senderId &&
            currentUser.username === message.receiver.username) ||
          (state.conversation.receiver.id === message.receiverId && currentUser.username === message.sender.username)
        ) {
          state.conversation.messages.push(message);
          state.scrollToBottom = true;
        } else if (
          state.conversation &&
          message.chatGroup &&
          state.conversation.receiver.id === message.chatGroup.id &&
          state.conversation.conversationType === 'ChatGroup'
        ) {
          state.conversation.messages.push(message);
          state.scrollToBottom = true;
        } else {
          console.log('ccccc');
        }
      } catch (error) {
        //   console.log('error');
        //   console.log(error);
      }

      //console.log('state.conversations');
      //console.log(state.conversations);

      // Tìm index của item hiện tại trong danh sách  mesages
      let receivedMessageIndex = -1;
      try {
        if (message.conversationType === 'ChatGroup') {
          // Xử lý chat group
          receivedMessageIndex = state.conversations.findIndex((item) => {
            return message.chatGroupId === item.chatGroupId;
          });
        } else if (message.conversationType === 'User') {
          // xử lý chat riêng tư
          receivedMessageIndex = state.conversations.findIndex((item) => {
            return (
              (message.senderId === item.senderId && message.receiverId === item.receiverId) ||
              (message.senderId === item.receiverId && message.receiverId === item.senderId) ||
              (message.senderId === item.receiver.id && message.receiverId === item.sender.id) ||
              (message.senderId === item.sender.id && message.receiverId === item.receiver.id)
            );
          });
        }
      } catch (error) {
        // console.log('error');
        // console.log(error);
      }

      if (receivedMessageIndex === 0) {
        // Nếu tin nhắn hiện tại đã nằm đầu danh sách thì thay đổi tin nhắn cuối cùng
        state.conversations[0].message = message.message;
        state.conversations[0].type = message.type;
        state.conversations[0].updatedAt = message.createdAt;
      } else if (receivedMessageIndex === -1) {
        // Nếu không có tin nhắn hiện tại trong danh sách thì thêm vào đầu
        state.conversations.unshift({
          sender: message.sender,
          receiver: message.receiver,
          message: message.message,
          type: message.type,
          conversationType: message.conversationType,
          updatedAt: message.createdAt,
        });
      } else {
        // Nếu tin nhắn hiện tại trong danh sách thì đưa lên đầu
        let [removedMessge] = state.conversations.splice(receivedMessageIndex, 1);
        state.conversations.unshift({
          ...removedMessge,
          message: message.message,
          type: message.type,
          updatedAt: message.createdAt,
        });
      }
    },

    sendMessaged: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
    },

    setIdChat: (state, action) => {
      state.idChat = action.payload;
    },

    ContactsChatGroupFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.searchContacts = action.payload;
    },

    SearchUserFetched: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.searchUser = action.payload;
    },

    emptyDataSearch: (state, action) => {
      state.searchUser = [];
    },

    huyKetBan: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      //state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },
    dongyKetBan: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      //state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },

    themBan: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      //state.entities = state.entities.filter((el) => el.id !== action.payload.id);
    },
  },
});
