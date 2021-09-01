import { chatsConstants } from './chatsConstants';

export function fetchChatListAction() {
  return {
    type: chatsConstants.FETCH_CHAT_LIST_REQUEST,
    payload: {},
  };
}

export function sendMessageAction(message) {
  return {
    type: chatsConstants.SEND_NEW_MESSAGE_REQUEST,
    payload: message,
  };
}

export function getSingleChatAction(data) {
  return {
    type: chatsConstants.GET_SINGLE_CHAT_REQUEST,
    payload: data,
  };
}

export function getOlderMessageAction(chatId) {
  return {
    type: chatsConstants.GET_OLDER_MESSAGE_REQUEST,
    payload: chatId,
  };
}

export function fileUploadAction(data) {
  return {
    type: chatsConstants.FILE_UPLOAD_REQUEST,
    payload: data,
  };
}

export function sendAudioAction(data) {
  return {
    type: chatsConstants.SEND_AUDIO_REQUEST,
    payload: data,
  };
}

export function showLoaderAction(data, loaderType) {
  return {
    type: chatsConstants.SHOW_LOADER_REQUEST,
    payload: {
      status: data,
      type: loaderType,
    },
  };
}

export function searchUser(data) {
  return {
    type: chatsConstants.SEARCH_USER_REQUEST,
    payload: data,
  };
}

export function sendMarkAsReadAction(chat) {
  return {
    type: chatsConstants.SEND_MARK_AS_READ_REQUEST,
    payload: chat,
  };
}

export const muteUserActon = (data) => ({
  type: chatsConstants.MUTE_USER_REQUEST,
  payload: data,
});

export const blockUnblockUserAction = (userId, action) => ({
  type: chatsConstants.BLOCK_UNBLOCK_USER_REQUEST,
  payload: {
    userId,
    action,
  },
});

export const deleteChatAction = (chatId) => ({
  type: chatsConstants.DELETE_CHAT_REQUEST,
  payload: chatId,
});

export const likeMessageAction = (msgId) => ({
  type: chatsConstants.LIKE_MESSAGE_REQUEST,
  payload: msgId,
});

export const unsendMessageAction = (chatId, msgId) => ({
  type: chatsConstants.UNSEND_MESSAGE_REQUEST,
  payload: {
    chatId,
    msgId,
  },
});

export const getUnfollowersAction = () => ({
  type: chatsConstants.GET_UNFOLLOWERS_REQUEST,
});

export const unfollowUserAction = (userId) => ({
  type: chatsConstants.UNFOLLOW_USER_REQUEST,
  payload: userId,
});

export const directInboxRecordsAction = () => ({
  type: chatsConstants.FETCH_DIRECT_INBOX_RECORDS_REQUEST,
});

export const pendingInboxRequestsAction = () => ({
  type: chatsConstants.FETCH_PENDING_INBOX_REQUEST,
});

export const resetChatWindowAction = (flag) => ({
  type: chatsConstants.RESET_CHAT_WINDOW_REQUEST,
  payload: flag,
});
