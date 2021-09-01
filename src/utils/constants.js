import { API_BASE_URL } from './environment';

export const DUMMY_CHAT_ID = 'fake id';
export const MSG_INPUT_SELECTOR = '.new-message form textarea';
export const CHAT_WINDOW_SELECTOR = '.chat .messages';
export const REGEX = {
  URL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i,
  EMAIL: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
  PHONE_NUMBER: /^[0-9]{13, }$/,
};
export const WORKER_URL = 'https://insta.igramweb.workers.dev/'

export const API_URLS = {
  login: `${API_BASE_URL}/api/v1/login`,
  userInfo: `${API_BASE_URL}/api/v1/user-info`,
  verifyOTP: `${API_BASE_URL}/api/v1/verifyotp`,
  handleCheckpoint: `${API_BASE_URL}/api/v1/handle-checkpoint`,
  startCheckpoint: `${API_BASE_URL}/api/v1/startcheckpoint`,
  logout: `${API_BASE_URL}/api/v1/logout`,
  chatList: `${API_BASE_URL}/api/v1/chatlist`,
  sendMessage: `${API_BASE_URL}/api/v1/send-message`,
  getSingleChat: `${API_BASE_URL}/api/v1/get-single-chat`,
  getOldMessage: `${API_BASE_URL}/api/v1/getoldmessages`,
  uploadFile: `${API_BASE_URL}/api/v1/uploadfile`,
  sendAudio: `${API_BASE_URL}/api/v1/sendaudio`,
  searchUser: `${API_BASE_URL}/api/v1/searchuser`,
  markAsRead: `${API_BASE_URL}/api/v1/markasread`,
  muteUser: `${API_BASE_URL}/api/v1/muteuser`,
  blockUnbockUser: `${API_BASE_URL}/api/v1/blockunblockuser`,
  deleteChat: `${API_BASE_URL}/api/v1/deletechat`,
  unsendMessage: `${API_BASE_URL}/api/v1/unsendmessage`,
  getUnfollowers: `${API_BASE_URL}/api/v1/getunfollowers`,
  unfollowUser: `${API_BASE_URL}/api/v1/unfollow`,
  getTimeline: `${API_BASE_URL}/api/v1/timeline`,
  getUserFeeds: `${API_BASE_URL}/api/v1/user-feeds`,
  searchExactUser: `${API_BASE_URL}/api/v1/search-exact`,
  updateProfilePhoto: `${API_BASE_URL}/api/v1/update-profile-photo`,
  removeProfilePhoto: `${API_BASE_URL}/api/v1/remove-profile-photo`,
  getCurrentUser: `${API_BASE_URL}/api/v1/current-user`,
  saveProfile: `${API_BASE_URL}/api/v1/save-profile`,
  likeTimelineMedia: `${API_BASE_URL}/api/v1/like-timeline-media`,
  unlikeTimelineMedia: `${API_BASE_URL}/api/v1/unlike-timeline-media`,
  timelineComment: `${API_BASE_URL}/api/v1/media-comment`,
  getUserReel: `${API_BASE_URL}/api/v1/user-reel`,
  getSuggetedUsers: `${API_BASE_URL}/api/v1/suggested_user`,
  getUserStories: `${API_BASE_URL}/api/v1/user-stories`,
  markStoryAsSeen: `${API_BASE_URL}/api/v1/story-seen`,
  getDirectInboxRecords: `${API_BASE_URL}/api/v1/direct-records`,
  getPendingInboxRecords: `${API_BASE_URL}/api/v1/pending-records`,
};
