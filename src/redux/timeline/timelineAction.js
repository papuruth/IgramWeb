import { timelineConstants } from './timelineConstants';

export const timelineAction = () => ({
  type: timelineConstants.FETCH_TIMELINE_REQUEST,
});

export const likeMediaAction = (mediaId, moduleInfo) => ({
  type: timelineConstants.LIKE_TIMELINE_MEDIA_REQUEST,
  payload: { mediaId, moduleInfo },
});

export const unlikeMediaAction = (mediaId, moduleInfo) => ({
  type: timelineConstants.UNLIKE_TIMELINE_MEDIA_REQUEST,
  payload: { mediaId, moduleInfo },
});

export const mediaCommentAction = (comment, mediaId) => ({
  type: timelineConstants.MEDIA_COMMENT_REQUEST,
  payload: {
    comment,
    mediaId,
  },
});

export const fetchUserReelAction = () => ({
  type: timelineConstants.FETCH_USER_REEL_REQUEST,
});

export const fetchSuggestedUserAction = (userId) => ({
  type: timelineConstants.FETCH_SUGGESTED_USER_REQUEST,
  payload: userId,
});

export const fetchStoriesItemsAction = (userId) => ({
  type: timelineConstants.FETCH_USER_STORIES_REQUEST,
  payload: userId,
});

export const markAsSeenStoryAction = (story) => ({
  type: timelineConstants.MARK_AS_SEEN_STORY_REQUEST,
  payload: story,
});