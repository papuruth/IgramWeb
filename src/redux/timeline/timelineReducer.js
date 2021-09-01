import _ from 'lodash';
import { timelineConstants } from './timelineConstants';

const initialState = {
  timelines: [],
  userReels: [],
  suggestedUser: [],
  userStoriesItems: [],
  storyMarkedAsSeen: {},
  hasMore: false,
};

export default function timelineReducer(state = initialState, action) {
  switch (action.type) {
    case timelineConstants.FETCH_TIMELINE_SUCCESS:
      return {
        ...state,
        timelines: [...state.timelines, ...action.payload.timelines],
        hasMore: action.payload.hasMore,
      };
    case timelineConstants.FETCH_TIMELINE_FAILURE:
      return {
        ...state,
        timelinesError: action.error,
      };
    case timelineConstants.LIKE_TIMELINE_MEDIA_SUCCESS: {
      const filterTimeline =
        state.timelines &&
        state.timelines.filter((item) => 'media_or_ad' in item);
      const match = _.findIndex(filterTimeline, [
        'media_or_ad.id',
        action.payload.mediaId,
      ]);
      _.set(filterTimeline[match], 'media_or_ad.has_liked', true);
      return {
        ...state,
        timelines: filterTimeline,
        hasMore: state.hasMore,
      };
    }
    case timelineConstants.LIKE_TIMELINE_MEDIA_FAILURE:
      return {
        ...state,
        likeMediaError: action.error,
      };
    case timelineConstants.UNLIKE_TIMELINE_MEDIA_SUCCESS: {
      const filterTimeline =
        state.timelines &&
        state.timelines.filter((item) => 'media_or_ad' in item);
      const match = _.findIndex(filterTimeline, [
        'media_or_ad.id',
        action.payload.mediaId,
      ]);
      _.set(filterTimeline[match], 'media_or_ad.has_liked', false);
      return {
        ...state,
        timelines: filterTimeline,
        hasMore: state.hasMore,
      };
    }
    case timelineConstants.UNLIKE_TIMELINE_MEDIA_FAILURE:
      return {
        ...state,
        unlikeMediaError: action.error,
      };
    case timelineConstants.MEDIA_COMMENT_SUCCESS: {
      const filterTimeline =
        state.timelines &&
        state.timelines.filter((item) => 'media_or_ad' in item);
      const match = _.findIndex(filterTimeline, [
        'media_or_ad.pk',
        action.payload.media_id,
      ]);
      filterTimeline[match].media_or_ad.comment_count += 1;
      filterTimeline[match].media_or_ad.preview_comments.push(action.payload);
      return {
        ...state,
        timelines: filterTimeline,
        hasMore: state.hasMore,
      };
    }
    case timelineConstants.MEDIA_COMMENT_FAILURE:
      return {
        ...state,
        meidaCommentError: action.error,
      };
    case timelineConstants.FETCH_USER_REEL_SUCCESS:
      return {
        ...state,
        userReels: action.payload,
      };
    case timelineConstants.FETCH_USER_REEL_FAILURE:
      return {
        ...state,
        userReelsError: action.error,
      };
    case timelineConstants.FETCH_SUGGESTED_USER_SUCCESS:
      return {
        ...state,
        suggestedUser: action.payload,
      };
    case timelineConstants.FETCH_SUGGESTED_USER_FAILURE:
      return {
        ...state,
        suggestedUserError: action.error,
      };
    case timelineConstants.FETCH_USER_STORIES_REQUEST:
      return {
        ...state,
        userStoriesItems: [],
      };
    case timelineConstants.FETCH_USER_STORIES_SUCCESS:
      return {
        ...state,
        userStoriesItems: action.payload,
      };
    case timelineConstants.FETCH_USER_STORIES_FAILURE:
      return {
        ...state,
        userStoriesError: action.error,
      };
    case timelineConstants.MARK_AS_SEEN_STORY_SUCCESS:
      return {
        ...state,
        storyMarkedAsSeen: action.payload,
      };
    case timelineConstants.MARK_AS_SEEN_STORY_FAILURE:
      return {
        ...state,
        storyMarkedAsSeenError: action.error,
      };
    default:
      return { ...state };
  }
}
