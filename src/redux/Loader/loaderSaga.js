import { call, put, takeEvery } from 'redux-saga/effects';
import { loaderConstants } from './loaderConstants';

export const success = (type, payload) => ({
  type,
  payload,
});

function* loaderSaga(action) {
  yield put(
    yield call(success, loaderConstants.SHOW_LOADER_SUCCESS, action.payload),
  );
}

export function* loaderWatcherSaga() {
  yield takeEvery(loaderConstants.SHOW_LOADER_REQUEST, loaderSaga);
}

function* primaryLoaderStartSaga() {
  yield put(yield call(success, loaderConstants.PRIMARY_LOADER_START_SUCCESS, true));
}

export function* primaryLoaderStartWatcherSaga() {
  yield takeEvery(
    loaderConstants.PRIMARY_LOADER_START_REQUEST,
    primaryLoaderStartSaga,
  );
}

function* primaryLoaderStopSaga() {
  yield put(yield call(success, loaderConstants.PRIMARY_LOADER_STOP_SUCCESS, false));
}

export function* primaryLoaderStopWatcherSaga() {
  yield takeEvery(
    loaderConstants.PRIMARY_LOADER_STOP_REQUEST,
    primaryLoaderStopSaga,
  );
}
