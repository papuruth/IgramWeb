/* eslint-disable import/no-cycle */
/* eslint-disable require-yield */
import history from '@/routes/history';
import api from '@/services/api';
import { sessionService } from 'redux-react-session';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { persistor } from '@/store/store';
import toast from '@/utils/toast';
import { userConstants } from './userConstants';
import { loaderConstants } from '../Loader/loaderConstants';

export const success = (type, payload) => ({
  type,
  payload,
});

export const failure = (type, error) => ({
  type,
  error,
});

const authenticateUser = async (payload) => {
  try {
    const { username, password } = payload;
    const response = await api.post('/login', { username, password });
    if (response && response.data.type === 'authResponse') {
      const userId = response.data.payload;
      const fullUserInfo = await api.get('/user-info', {
        params: {
          userId,
        },
      });
      await sessionService.saveSession(fullUserInfo.data.userInfo);
      await sessionService.saveUser(fullUserInfo.data.userInfo);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

function* userAuthSaga(action) {
  const data = yield call(authenticateUser, action.payload);
  if (data && data.type === 'authResponse') {
    yield put(
      yield call(success, userConstants.USER_AUTH_SUCCESS, data.payload),
    );
    persistor.persist();
    history.push('/');
  }
  if (data.type === 'isCheckpointError') {
    yield put(yield call(failure, userConstants.USER_AUTH_FAILURE, data));
  }
  if (data.type === 'isTwoFactorError') {
    yield put(yield call(failure, userConstants.USER_AUTH_FAILURE, data));
  }
  if (data.type === 'loginError') {
    yield put(yield call(failure, userConstants.USER_AUTH_FAILURE, data));
  }
}

export function* userAuthWatcherSaga() {
  yield takeEvery(userConstants.USER_AUTH_REQUEST, userAuthSaga);
}

export const verifyOtpLogin = async (otpDetails) => {
  try {
    const response = await api.post('/verifyotp', { otpDetails });
    if (response && response.data.type === 'authResponse') {
      const userId = response.data.payload;
      const fullUserInfo = await api.get('/user-info', {
        params: {
          userId,
        },
      });
      await sessionService.saveSession(fullUserInfo.data.userInfo);
      await sessionService.saveUser(fullUserInfo.data.userInfo);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

function* userAuthVerifyOtp(action) {
  const data = yield call(verifyOtpLogin, action.payload);
  if (data && data.type === 'authResponse') {
    yield put(yield call(success, userConstants.GREETINGS_FLAG_SUCCESS, true));
    yield put(
      yield call(success, userConstants.USER_AUTH_SUCCESS, data.payload),
    );
    persistor.persist();
    history.push('/');
  } else {
    yield put(yield call(failure, userConstants.USER_AUTH_FAILURE, data));
  }
}

export function* userAuthVerifyOtpWatcherSaga() {
  yield takeEvery(
    userConstants.USER_AUTH_OTP_VERIFY_REQUEST,
    userAuthVerifyOtp,
  );
}

const userAuthHandleCheckpoint = async (otp) => {
  try {
    const response = await api.post('/handle-checkpoint', { otp });
    if (response && response.data.type === 'authResponse') {
      const userId = response.data.payload;
      const fullUserInfo = await api.get('/user-info', {
        params: {
          userId,
        },
      });
      await sessionService.saveSession(fullUserInfo.data.userInfo);
      await sessionService.saveUser(fullUserInfo.data.userInfo);
    }
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* userAuthHandleCheckpointSaga(action) {
  const { response, error } = yield call(
    userAuthHandleCheckpoint,
    action.payload,
  );
  if (response && response.type === 'authResponse') {
    yield put(yield call(success, userConstants.GREETINGS_FLAG_SUCCESS, true));
    yield put(
      yield call(success, userConstants.USER_AUTH_SUCCESS, response.payload),
    );
    persistor.persist();
    history.push('/');
  } else {
    yield put(yield call(failure, userConstants.USER_AUTH_FAILURE, error));
  }
}

export function* userAuthHandleCheckpointWatcherSaga() {
  yield takeEvery(
    userConstants.USER_AUTH_CHECKPOINT_HANDLE_REQUEST,
    userAuthHandleCheckpointSaga,
  );
}

const userAuthStartCheckpointService = async () => {
  try {
    const response = await api.post('/startcheckpoint');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* userAuthStartCheckpointSaga() {
  const { response, error } = yield call(userAuthStartCheckpointService);
  if (response && response.type === 'authResponse') {
    yield put(
      yield call(
        success,
        userConstants.USER_AUTH_START_CHECKPOINT_SUCCESS,
        response,
      ),
    );
  } else {
    yield put(
      yield call(
        failure,
        userConstants.USER_AUTH_START_CHECKPOINT_FAILURE,
        error,
      ),
    );
  }
}

export function* userAuthStartCheckpointWatcherSaga() {
  yield takeEvery(
    userConstants.USER_AUTH_START_CHECKPOINT_REQUEST,
    userAuthStartCheckpointSaga,
  );
}

const userLogoutService = async ({ username }) => {
  try {
    const response = await api.post('/logout', { username });
    return response.data;
  } catch (error) {
    return error;
  }
};

function* userLogout(action) {
  const data = yield call(userLogoutService, action.payload);
  if (data.payload.status === 'ok') {
    yield sessionService.deleteSession();
    yield sessionService.deleteUser();
    data.user = action.payload?.fullname;
    yield persistor.pause();
    yield persistor.flush();
    yield persistor.purge();
    localStorage.removeItem('persist:root');
    yield put(yield call(success, userConstants.USER_LOGOUT_SUCCESS, data));
    history.push('/');
  } else {
    yield put(yield call(failure, userConstants.USER_LOGOUT_FAILURE, data));
  }
}

export function* userLogoutWatcherSaga() {
  yield takeEvery(userConstants.USER_LOGOUT_REQUEST, userLogout);
}

function* changeGreetingFlagSaga(action) {
  yield put(
    yield call(success, userConstants.GREETINGS_FLAG_SUCCESS, action.payload),
  );
}

export function* changeGreetingFlagWatcher() {
  yield takeEvery(userConstants.GREETINGS_FLAG_REQUEST, changeGreetingFlagSaga);
}

const userFeedService = async ({ userId, feeds }) => {
  try {
    const response = await api.post('/user-feeds', { userId, feeds });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* userFeedSaga(action) {
  const { response, error } = yield call(userFeedService, action.payload);
  if (response) {
    yield put(
      yield call(success, userConstants.FETCH_USER_FEED_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, userConstants.FETCH_USER_FEED_FAILURE, error),
    );
    yield delay(3000);
    userFeedSaga(action);
    yield put({ type: loaderConstants.PRIMARY_LOADER_STOP_REQUEST });
  }
}

export function* userFeedWatcherSaga() {
  yield takeEvery(userConstants.FETCH_USER_FEED_REQUEST, userFeedSaga);
}

const fullUserInfoService = async ({ userId, pk }) => {
  try {
    const response = await api.get('/user-info', { params: { userId } });
    if (userId === pk) sessionService.saveUser(response.data.userInfo);
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* fullUserInfoSaga(action) {
  const { response, error } = yield call(fullUserInfoService, action.payload);
  if (response) {
    yield put(
      yield call(success, userConstants.FETCH_FULL_USER_INFO_SUCCESS, response),
    );
    yield put({ type: loaderConstants.PRIMARY_LOADER_STOP_REQUEST });
  } else {
    yield put(
      yield call(failure, userConstants.FETCH_FULL_USER_INFO_FAILURE, error),
    );
    yield put({ type: loaderConstants.PRIMARY_LOADER_STOP_REQUEST });
  }
}

export function* fullUserInfoWatcherSaga() {
  yield takeEvery(userConstants.FETCH_FULL_USER_INFO_REQUEST, fullUserInfoSaga);
}

const searchExactUserService = async (username) => {
  try {
    const response = await api.get('/search-exact', { params: { username } });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* searchExactUserSaga(action) {
  const { response, error } = yield call(
    searchExactUserService,
    action.payload,
  );
  if (response) {
    yield put(
      yield call(success, userConstants.SEARCH_EXACT_USER_SUCCESS, response),
    );
    yield put({ type: loaderConstants.PRIMARY_LOADER_STOP_REQUEST });
  } else {
    yield put(
      yield call(failure, userConstants.SEARCH_EXACT_USER_FAILURE, error),
    );
    yield put({ type: loaderConstants.PRIMARY_LOADER_STOP_REQUEST });
  }
}

export function* searchExactUserWatcherSaga() {
  yield takeEvery(userConstants.SEARCH_EXACT_USER_REQUEST, searchExactUserSaga);
}

const updateUserProfilePictureService = async (data) => {
  try {
    const uploadPhotoResponse = await api.post('/update-profile-photo', data);
    const userId = uploadPhotoResponse.data.user.pk;
    const response = await api.get('/user-info', { params: { userId } });
    await sessionService.saveUser(response.data.userInfo);
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* updateUserProfilePictureSaga(action) {
  const { response, error } = yield call(
    updateUserProfilePictureService,
    action.payload,
  );
  if (response) {
    yield put(
      yield call(
        success,
        userConstants.UPDATE_PROFILE_PICTURE_SUCCESS,
        response,
      ),
    );
    yield put(
      yield call(success, loaderConstants.SHOW_LOADER_SUCCESS, {
        type: 'profilePhotoLoader',
        flag: false,
      }),
    );
  } else {
    yield put(
      yield call(failure, userConstants.UPDATE_PROFILE_PICTURE_FAILURE, error),
    );
  }
}

export function* updateUserProfilePictureWatcherSaga() {
  yield takeEvery(
    userConstants.UPDATE_PROFILE_PICTURE_REQUEST,
    updateUserProfilePictureSaga,
  );
}

const removeUserProfilePictureService = async () => {
  try {
    const removePhotoResponse = await api.post('/remove-profile-photo');
    const userId = removePhotoResponse.data.user.pk;
    const response = await api.get('/user-info', { params: { userId } });
    await sessionService.saveUser(response.data.userInfo);
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* removeUserProfilePictureSaga() {
  const { response, error } = yield call(removeUserProfilePictureService);
  if (response) {
    yield put(
      yield call(
        success,
        userConstants.REMOVE_PROFILE_PICTURE_SUCCESS,
        response,
      ),
    );
    yield put(
      yield call(success, loaderConstants.SHOW_LOADER_SUCCESS, {
        type: 'profilePhotoLoader',
        flag: false,
      }),
    );
  } else {
    yield put(
      yield call(failure, userConstants.REMOVE_PROFILE_PICTURE_FAILURE, error),
    );
  }
}

export function* removeUserProfilePictureWatcherSaga() {
  yield takeEvery(
    userConstants.REMOVE_PROFILE_PICTURE_REQUEST,
    removeUserProfilePictureSaga,
  );
}

const getCurrentUserService = async () => {
  try {
    const response = await api.get('/current-user');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* getCurrentUserSaga() {
  const { response, error } = yield call(getCurrentUserService);
  if (response) {
    yield put(
      yield call(success, userConstants.GET_CURRENT_USER_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, userConstants.GET_CURRENT_USER_FAILURE, error),
    );
    yield delay(3000);
    getCurrentUserSaga();
  }
}

export function* getCurrentUserWatcherSaga() {
  yield takeEvery(userConstants.GET_CURRENT_USER_REQUEST, getCurrentUserSaga);
}

const saveProfileService = async (formData) => {
  try {
    const response = await api.post('/save-profile', { formData });
    return { response: response.data };
  } catch (error) {
    return { error: error.response.data };
  }
};

function* saveProfileSaga(action) {
  const { response, error } = yield call(saveProfileService, action.payload);
  if (response) {
    yield put(
      yield call(success, userConstants.GET_CURRENT_USER_SUCCESS, response),
    );
  } else {
    yield put(yield call(failure, userConstants.SAVE_PROFILE_FAILURE, error));
    toast.warning(error.message);
  }
}

export function* saveProfileWatcherSaga() {
  yield takeEvery(userConstants.SAVE_PROFILE_REQUEST, saveProfileSaga);
}
