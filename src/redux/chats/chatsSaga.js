import {
  call,
  put,
  takeEvery,
  delay,
  takeLatest,
  take,
  cancel,
  cancelled,
  fork,
} from 'redux-saga/effects';
import Axios from 'axios';
import api from '@/services/api';
import { chatsConstants } from './chatsConstants';
import { userConstants } from '../user/userConstants';
import { loaderConstants } from '../Loader/loaderConstants';

let chatListTimeoutObj;
let messagesThread;
export const success = (type, payload) => ({
  type,
  payload,
});

export const failure = (type, error) => ({
  type,
  error,
});

const fetchChatList = async () => {
  try {
    const response = await api.get('/chatlist');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* fetchChatListSaga() {
  try {
    const { response, error } = yield call(fetchChatList);
    if (response && response?.status) {
      yield put(
        yield call(
          success,
          chatsConstants.FETCH_CHAT_LIST_SUCCESS,
          response.data,
        ),
      );
    } else {
      yield put(
        yield call(failure, chatsConstants.FETCH_CHAT_LIST_FAILURE, error),
      );
    }
    if (chatListTimeoutObj) {
      clearTimeout(chatListTimeoutObj);
    }
    chatListTimeoutObj = yield delay(3000);
    if (chatListTimeoutObj) {
      yield fetchChatListSaga();
    }
  } finally {
    if (yield cancelled()) clearTimeout(chatListTimeoutObj);
  }
}

export function* chatListFetchWatcher() {
  while (yield take(chatsConstants.FETCH_CHAT_LIST_REQUEST)) {
    const fetchChatListSyncTask = yield fork(fetchChatListSaga);
    if (yield take(userConstants.USER_LOGOUT_REQUEST)) {
      yield cancel(fetchChatListSyncTask);
    }
  }
}

const sendNewMessageService = async (message) => {
  try {
    const response = await api.post('/send-message', {
      message,
    });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* sendNewMessageSaga(action) {
  const { response, error } = yield call(sendNewMessageService, action.payload);
  if (response) {
    yield put(
      yield call(
        success,
        chatsConstants.SEND_NEW_MESSAGE_SUCCESS,
        response.payload,
      ),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.SEND_NEW_MESSAGE_FAILURE, error),
    );
  }
}

export function* sendNewMessageWatcher() {
  yield takeEvery(chatsConstants.SEND_NEW_MESSAGE_REQUEST, sendNewMessageSaga);
}

const getSingleChatService = async (chatId) => {
  try {
    const response = await api.get('/get-single-chat', {
      params: {
        chatId,
      },
    });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* getSingleChatSaga(action) {
  // used to get older messages, see #getOlderMessages
  if (messagesThread && messagesThread.threadId !== action.payload) {
    messagesThread = null;
  }
  yield delay(2000);
  const { response, error } = !action.payload.isNewChat
    ? yield call(getSingleChatService, action.payload.chatId)
    : { response: action.payload };
  const { isNewChat } = response;
  if (response && !isNewChat) {
    yield put(
      yield call(
        success,
        chatsConstants.GET_SINGLE_CHAT_SUCCESS,
        response.data,
      ),
    );
  } else if (isNewChat) {
    yield put(
      yield call(
        success,
        chatsConstants.GET_SINGLE_CHAT_SUCCESS,
        response.chatData,
      ),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.GET_SINGLE_CHAT_FAILURE, error),
    );
  }
}
export function* getSingleChatWatcher() {
  yield takeEvery(chatsConstants.GET_SINGLE_CHAT_REQUEST, getSingleChatSaga);
}

function* getOlderMessageSaga(action) {
  const getOlderMessageSevice = async (chatId, thread) => {
    try {
      const response = await api.post('/getoldmessages', {
        chatId,
        thread,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };
  const data = yield call(
    getOlderMessageSevice,
    action.payload,
    messagesThread,
  );
  if (data && data.type === 'oldMessageResponse') {
    messagesThread = data.payload.messagesThread;
    data.payload.messages.map((item) =>
      data.payload.messagesThread.items.push(item),
    );
    yield put(
      yield call(
        success,
        chatsConstants.GET_OLDER_MESSAGE_SUCCESS,
        data.payload.messagesThread,
      ),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.GET_OLDER_MESSAGE_FAILURE, data),
    );
  }
}

export function* getOlderMessageWatcher() {
  yield takeEvery(
    chatsConstants.GET_OLDER_MESSAGE_REQUEST,
    getOlderMessageSaga,
  );
}

const fileUploadService = async (data) => {
  try {
    const response = await api.post('/uploadfile', data);
    return response.data;
  } catch (error) {
    return error;
  }
};

function* fileUploadSaga(action) {
  const data = yield call(fileUploadService, action.payload);
  if (data && data?.payload?.status) {
    yield put(
      yield call(
        success,
        chatsConstants.FILE_UPLOAD_SUCCESS,
        data.payload.status,
      ),
    );
  } else {
    yield put(yield call(failure, chatsConstants.FILE_UPLOAD_FAILURE, data));
  }
}

export function* fileUploadWatcherSaga() {
  yield takeEvery(chatsConstants.FILE_UPLOAD_REQUEST, fileUploadSaga);
}

function* sendAudioSaga(action) {
  const sendAudioService = async (data) => {
    try {
      const response = await api.post('/sendaudio', data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  };

  const data = yield call(sendAudioService, action.payload);
  if (data && data.type === 'AudioSentResponse') {
    yield put(
      yield call(success, chatsConstants.SEND_AUDIO_SUCCESS, data.payload),
    );
  } else {
    yield put(yield call(failure, chatsConstants.SEND_AUDIO_FAILURE, data));
  }
}

export function* sendAudioWatcherSaga() {
  yield takeEvery(chatsConstants.SEND_AUDIO_REQUEST, sendAudioSaga);
}

function* showHideLoaderSaga(action) {
  yield put(
    yield call(success, chatsConstants.SHOW_LOADER_SUCCESS, action.payload),
  );
}

export function* showLoaderWatcherSaga() {
  yield takeLatest(chatsConstants.SHOW_LOADER_REQUEST, showHideLoaderSaga);
}

let cancelRequest;
const searchUserService = async (query) => {
  try {
    // Cancel previous request
    if (cancelRequest) {
      cancelRequest();
    }
    const { CancelToken } = Axios;
    const response = await api.get('/searchuser', {
      cancelToken: new CancelToken((c) => {
        cancelRequest = c;
      }),
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

function* searchUserSaga(action) {
  const data = yield call(searchUserService, action.payload);
  if (data && data.type === 'searchUserResponse') {
    yield put(
      yield call(success, chatsConstants.SEARCH_USER_SUCCESS, data.payload),
    );
  } else {
    yield put(yield call(failure, chatsConstants.SEARCH_USER_FAILURE, data));
  }
}

export function* searchUserWatcherSaga() {
  yield takeLatest(chatsConstants.SEARCH_USER_REQUEST, searchUserSaga);
}

const sendMarkAsReadService = async (thread) => {
  try {
    const response = await api.post('/markasread', { thread });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* sendMarkAsReadSaga(action) {
  const { response, error } = yield call(sendMarkAsReadService, action.payload);
  if (response) {
    yield put(
      yield call(success, chatsConstants.SEND_MARK_AS_READ_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.SEND_MARK_AS_READ_FAILURE, error),
    );
  }
}

export function* sendMarkAsReadWatcherSaga() {
  yield takeEvery(chatsConstants.SEND_MARK_AS_READ_REQUEST, sendMarkAsReadSaga);
}

const muteUserService = async (thread) => {
  try {
    const response = await api.post('/muteuser', { thread });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};
function* muteUserSaga(action) {
  const { response, error } = yield call(muteUserService, action.payload);
  if (response) {
    yield put(yield call(success, chatsConstants.MUTE_USER_SUCCESS, response));
  } else {
    yield put(yield call(failure, chatsConstants.MUTE_USER_FAILURE, error));
  }
}

export function* muteUserWatcherSaga() {
  yield takeEvery(chatsConstants.MUTE_USER_REQUEST, muteUserSaga);
}

const blockUnblockUserService = async (payload) => {
  const { userId, action } = payload;
  try {
    const response = await api.post('/blockunblockuser', { userId, action });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* blockUnblockUserSaga(action) {
  const { response, error } = yield call(
    blockUnblockUserService,
    action.payload,
  );
  if (response) {
    yield put(
      yield call(success, chatsConstants.BLOCK_UNBLOCK_USER_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.BLOCK_UNBLOCK_USER_FAILURE, error),
    );
  }
}

export function* blockUnblockUserWatcherSaga() {
  yield takeEvery(
    chatsConstants.BLOCK_UNBLOCK_USER_REQUEST,
    blockUnblockUserSaga,
  );
}

const deleteChatService = async (chatId) => {
  try {
    const response = await api.post('/deletechat', { chatId });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* deleteChatSaga(action) {
  const { response, error } = yield call(deleteChatService, action.payload);
  if (response) {
    yield put(
      yield call(success, chatsConstants.DELETE_CHAT_SUCCESS, response),
    );
  } else {
    yield put(yield call(failure, chatsConstants.DELETE_CHAT_FAILURE, error));
  }
}

export function* deleteChatWatcherSaga() {
  yield takeEvery(chatsConstants.DELETE_CHAT_REQUEST, deleteChatSaga);
}

const likeMessageService = async (msgId) => {
  try {
    const response = await api.post('/likemessage', { msgId });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* likeMessageSaga(action) {
  const { response, error } = yield call(likeMessageService, action.payload);
  if (response) {
    yield put(
      yield call(success, chatsConstants.LIKE_MESSAGE_SUCCESS, response),
    );
  } else {
    yield put(yield call(failure, chatsConstants.LIKE_MESSAGE_SUCCESS, error));
  }
}

export function* likeMessageWatcherSaga() {
  yield takeEvery(chatsConstants.LIKE_MESSAGE_REQUEST, likeMessageSaga);
}

const unsendMessageService = async ({ chatId, msgId }) => {
  try {
    const response = await api.post('/unsendmessage', { chatId, msgId });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* unsendMessageSaga(action) {
  const { response, error } = yield call(unsendMessageService, action.payload);
  if (response) {
    yield put(
      yield call(success, chatsConstants.UNSEND_MESSAGE_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.UNSEND_MESSAGE_FAILURE, error),
    );
  }
}

export function* unsendMessageWatcherSaga() {
  yield takeEvery(chatsConstants.UNSEND_MESSAGE_REQUEST, unsendMessageSaga);
}

const getUnfollowersService = async () => {
  try {
    const response = await api.get('/getunfollowers');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* getUnfollowersSaga() {
  const { response, error } = yield call(getUnfollowersService);
  if (response) {
    yield put(
      yield call(success, chatsConstants.GET_UNFOLLOWERS_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, chatsConstants.GET_UNFOLLOWERS_FAILURE, error),
    );
    getUnfollowersSaga();
  }
}

export function* getUnfollowersWatcherSaga() {
  yield takeEvery(chatsConstants.GET_UNFOLLOWERS_REQUEST, getUnfollowersSaga);
}

const unfollowUserService = async (userId) => {
  try {
    const response = await api.post('/unfollow', { userId });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* unfollowUserSaga(action) {
  const { response, error } = yield call(unfollowUserService, action.payload);
  if (response) {
    yield put(
      yield call(success, chatsConstants.UNFOLLOW_USER_SUCCESS, response),
    );
  } else {
    yield put(yield call(failure, chatsConstants.UNFOLLOW_USER_FAILURE, error));
    unfollowUserSaga(action);
  }
}

export function* unfollowUserWatcherSaga() {
  yield takeEvery(chatsConstants.UNFOLLOW_USER_REQUEST, unfollowUserSaga);
}

/**
 * @description Saga for fetching direct inbox count
 * @type Redux saga generator function
 */

const directInboxRecordsService = async () => {
  try {
    const response = await api.get('/direct-records');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* directInboxRecordsSaga() {
  const { response, error } = yield call(directInboxRecordsService);
  if (response) {
    yield put(
      yield call(
        success,
        chatsConstants.FETCH_DIRECT_INBOX_RECORDS_SUCCESS,
        response,
      ),
    );
  } else {
    yield put(
      yield call(
        failure,
        chatsConstants.FETCH_DIRECT_INBOX_RECORDS_FAILURE,
        error,
      ),
    );
    directInboxRecordsSaga();
  }
}

export function* directInboxRecordsWatcherSaga() {
  yield takeEvery(
    chatsConstants.FETCH_DIRECT_INBOX_RECORDS_REQUEST,
    directInboxRecordsSaga,
  );
}

/**
 * @description Saga for fetching pending requests
 * @type Redux saga generator function
 */

const pendingInboxRequestsService = async () => {
  try {
    const response = await api.get('/pending-records');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* pendingInboxRequestsSaga() {
  const { response, error } = yield call(pendingInboxRequestsService);
  if (response) {
    yield put(
      yield call(success, chatsConstants.FETCH_PENDING_INBOX_SUCCESS, response),
    );
    yield put(yield call(success, loaderConstants.SHOW_LOADER_SUCCESS, false));
  } else {
    yield put(
      yield call(failure, chatsConstants.FETCH_PENDING_INBOX_FAILURE, error),
    );
    pendingInboxRequestsSaga();
  }
}

export function* pendingInboxRequestsWatcherSaga() {
  yield takeEvery(
    chatsConstants.FETCH_PENDING_INBOX_REQUEST,
    pendingInboxRequestsSaga,
  );
}

function* resetChatWindowSaga(action) {
  yield put(
    yield call(
      success,
      chatsConstants.RESET_CHAT_WINDOW_SUCCESS,
      action.payload,
    ),
  );
}

export function* resetChatWindowWatcherSaga() {
  yield takeEvery(
    chatsConstants.RESET_CHAT_WINDOW_REQUEST,
    resetChatWindowSaga,
  );
}
