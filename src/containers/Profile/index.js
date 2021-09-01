import { connect } from 'react-redux';
import Profile from '@/components/Profile';

const mapStateToProps = (state) => {
  const { profilePhotoLoader } = state.loaderReducer;
  const { user } = state.session;
  const {
    profileUpdateSuccess,
    updatedUserInfo,
    profilePhotoUpdated,
    profilePhotoRemoved,
  } = state.userReducer;
  const { unfollowers } = state.chatReducer;
  const {
    userFeeds,
    userFeedError,
    allFeeds,
    hasMore,
    userInfo,
    friendship,
    highlights,
    suggestedUser,
    searchExactUserInfo,
  } = state.userFeedReducer;
  return {
    user,
    userFeeds,
    userFeedError,
    allFeeds,
    hasMore,
    userInfo: profileUpdateSuccess ? updatedUserInfo : userInfo,
    friendship,
    highlights,
    suggestedUser,
    searchExactUserInfo,
    profilePhotoUpdated,
    profilePhotoRemoved,
    profilePhotoLoader,
    unfollowers,
  };
};

export default connect(mapStateToProps)(Profile);
