import api from '@/services/api';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { timelineConstants } from './timelineConstants';

export const success = (type, payload) => ({
  type,
  payload,
});

export const failure = (type, error) => ({
  type,
  error,
});

const fetchTimelineService = async () => {
  try {
    const response = await api.get('/timeline');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* fetchTimelineSaga() {
  const { response, error } = yield call(fetchTimelineService);
  if (response) {
    yield put(
      yield call(success, timelineConstants.FETCH_TIMELINE_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, timelineConstants.FETCH_TIMELINE_FAILURE, error),
    );
    yield delay(3000);
    fetchTimelineSaga();
  }
}

export function* fetchTimelineWatcherSaga() {
  yield takeEvery(timelineConstants.FETCH_TIMELINE_REQUEST, fetchTimelineSaga);
}

const likeTiemlineMediaService = async ({ mediaId, moduleInfo }) => {
  try {
    const response = await api.post('/like-timeline-media', {
      mediaId,
      moduleInfo,
    });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* likeTiemlineMediaSaga(action) {
  const { response } = yield call(likeTiemlineMediaService, action.payload);
  if (response) {
    yield put(
      yield call(
        success,
        timelineConstants.LIKE_TIMELINE_MEDIA_SUCCESS,
        action.payload,
      ),
    );
  } else {
    yield put(
      yield call(
        success,
        timelineConstants.LIKE_TIMELINE_MEDIA_FAILURE,
        response,
      ),
    );
    yield delay(3000);
    likeTiemlineMediaSaga(action);
  }
}

export function* likeTiemlineMediaWatcherSaga() {
  yield takeEvery(
    timelineConstants.LIKE_TIMELINE_MEDIA_REQUEST,
    likeTiemlineMediaSaga,
  );
}

const unlikeTiemlineMediaService = async ({ mediaId, moduleInfo }) => {
  try {
    const response = await api.post('/unlike-timeline-media', {
      mediaId,
      moduleInfo,
    });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* unlikeTiemlineMediaSaga(action) {
  const { response } = yield call(unlikeTiemlineMediaService, action.payload);
  if (response) {
    yield put(
      yield call(
        success,
        timelineConstants.UNLIKE_TIMELINE_MEDIA_SUCCESS,
        action.payload,
      ),
    );
  } else {
    yield put(
      yield call(
        success,
        timelineConstants.UNLIKE_TIMELINE_MEDIA_FAILURE,
        response,
      ),
    );
    yield delay(3000);
    unlikeTiemlineMediaSaga(action);
  }
}

export function* unlikeTiemlineMediaWatcherSaga() {
  yield takeEvery(
    timelineConstants.UNLIKE_TIMELINE_MEDIA_REQUEST,
    unlikeTiemlineMediaSaga,
  );
}

const mediaCommentService = async ({ comment, mediaId }) => {
  try {
    const response = await api.post('/media-comment', { comment, mediaId });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* mediaCommentSaga(action) {
  const { response, error } = yield call(mediaCommentService, action.payload);
  if (response) {
    yield put(
      yield call(success, timelineConstants.MEDIA_COMMENT_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, timelineConstants.MEDIA_COMMENT_FAILURE, error),
    );
    yield delay(1000);
    mediaCommentSaga(action);
  }
}

export function* mediaCommentWatcherSaga() {
  yield takeEvery(timelineConstants.MEDIA_COMMENT_REQUEST, mediaCommentSaga);
}

const fetchUserReelService = async () => {
  try {
    const response = await api.get('/user-reel');
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* fetchUserReelSaga() {
  const { response, error } = yield call(fetchUserReelService);
  if (response) {
    yield put(
      yield call(success, timelineConstants.FETCH_USER_REEL_SUCCESS, response),
    );
  } else {
    yield put(
      yield call(failure, timelineConstants.FETCH_USER_REEL_FAILURE, error),
    );
    yield delay(1000);
    fetchUserReelSaga();
  }
}

export function* fetchUserReelWatcherSaga() {
  yield takeEvery(timelineConstants.FETCH_USER_REEL_REQUEST, fetchUserReelSaga);
}

const fetchSuggestedUserService = async (userId) => {
  try {
    const response = await api.get('/suggested_user', {
      params: {
        userId,
      },
    });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* fetchSuggestedUserSaga(action) {
  const { response, error } = yield call(
    fetchSuggestedUserService,
    action.payload,
  );
  if (response) {
    yield put(
      yield call(
        success,
        timelineConstants.FETCH_SUGGESTED_USER_SUCCESS,
        response,
      ),
    );
  } else {
    yield put(
      yield call(
        failure,
        timelineConstants.FETCH_SUGGESTED_USER_FAILURE,
        error,
      ),
    );
    yield delay(1000);
    fetchSuggestedUserSaga();
  }
}

export function* fetchSuggestedUserWatcherSaga() {
  yield takeEvery(
    timelineConstants.FETCH_SUGGESTED_USER_REQUEST,
    fetchSuggestedUserSaga,
  );
}

/**
 * @description Saga for fetching user stories based on user ids
 * @type Redux saga generator function
 */

const fetchStoriesItemsService = async (userId) => {
  try {
    const response = await api.get('/user-stories', {
      params: {
        userId,
      },
    });
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* fetchStoriesItemsSaga(action) {
  const { response, error } = yield call(
    fetchStoriesItemsService,
    action.payload,
  );
  if (response) {
    yield put(
      yield call(
        success,
        timelineConstants.FETCH_USER_STORIES_SUCCESS,
        response,
      ),
    );
  } else {
    yield put(
      yield call(failure, timelineConstants.FETCH_USER_STORIES_FAILURE, error),
    );
    yield delay(1000);
    fetchStoriesItemsSaga();
  }
}

export function* fetchStoriesItemsWatcherSaga() {
  yield takeEvery(
    timelineConstants.FETCH_USER_STORIES_REQUEST,
    fetchStoriesItemsSaga,
  );
}

/**
 * @description Saga for marking story as seen
 * @type Redux saga generator function
 */

const markAsSeenStoryService = async (story) => {
  try {
    const response = await api.post('/story-seen', {story});
    return { response: response.data };
  } catch (error) {
    return { error };
  }
};

function* markAsSeenStorySaga(action) {
  const { response, error } = yield call(
    markAsSeenStoryService,
    action.payload,
  );
  if (response) {
    yield put(
      yield call(
        success,
        timelineConstants.MARK_AS_SEEN_STORY_SUCCESS,
        response,
      ),
    );
  } else {
    yield put(
      yield call(failure, timelineConstants.MARK_AS_SEEN_STORY_FAILURE, error),
    );
    yield delay(1000);
    markAsSeenStorySaga();
  }
}

export function* markAsSeenStoryWatcherSaga() {
  yield takeEvery(
    timelineConstants.MARK_AS_SEEN_STORY_REQUEST,
    markAsSeenStorySaga,
  );
}
