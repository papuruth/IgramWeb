import { userConstants } from './userConstants';

export function userAuthRequest(username, password) {
  return {
    type: userConstants.USER_AUTH_REQUEST,
    payload: {
      username,
      password,
    },
  };
}

export function userAuthVerifyOtp(otpDetails) {
  return {
    type: userConstants.USER_AUTH_OTP_VERIFY_REQUEST,
    payload: otpDetails,
  };
}

export const userAuthStartCheckpoint = () => ({
  type: userConstants.USER_AUTH_START_CHECKPOINT_REQUEST,
});

export const userAuthHandleCheckpoint = (otp) => ({
  type: userConstants.USER_AUTH_CHECKPOINT_HANDLE_REQUEST,
  payload: otp,
});

export function userLogout(fullname, username) {
  return {
    type: userConstants.USER_LOGOUT_REQUEST,
    payload: { fullname, username },
  };
}

export function changeGreetingFlagAction(flag) {
  return {
    type: userConstants.GREETINGS_FLAG_REQUEST,
    payload: flag,
  };
}

export const userFeedAction = (userId, feeds) => ({
  type: userConstants.FETCH_USER_FEED_REQUEST,
  payload: {
    userId,
    feeds,
  },
});

export const fullUserInfoAction = (userId, pk) => ({
  type: userConstants.FETCH_FULL_USER_INFO_REQUEST,
  payload: { userId, pk: pk || null },
});

export const searchExactUserAction = (username, currentUserData, userFeeds) => ({
  type: userConstants.SEARCH_EXACT_USER_REQUEST,
  payload: { username, currentUserData, userFeeds },
});

export const updateUserProfilePictureAction = (data) => ({
  type: userConstants.UPDATE_PROFILE_PICTURE_REQUEST,
  payload: data,
});

export const removeUserProfilePictureAction = () => ({
  type: userConstants.REMOVE_PROFILE_PICTURE_REQUEST,
});

export const getCurrentUserAction = () => ({
  type: userConstants.GET_CURRENT_USER_REQUEST,
});

export const saveProfileAction = (formData) => ({
  type: userConstants.SAVE_PROFILE_REQUEST,
  payload: formData,
});
