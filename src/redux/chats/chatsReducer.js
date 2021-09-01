import { chatsConstants } from './chatsConstants';

export default function chatReducer(state = {}, action) {
  switch (action.type) {
    case chatsConstants.FETCH_CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatsList: action.payload,
      };
    case chatsConstants.FETCH_CHAT_LIST_FAILURE:
      return {
        ...state,
        chatListError: action.error,
      };
    case chatsConstants.SEND_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        sentMessageSuccessStatus: action.payload,
      };
    case chatsConstants.SEND_NEW_MESSAGE_FAILURE:
      return {
        ...state,
        sentMessageFailureStatus: action.payload,
      };
    case chatsConstants.GET_SINGLE_CHAT_SUCCESS:
      return {
        ...state,
        getSingleChat: action.payload,
        olderMessages: '',
        newChatData: {},
        isMuted: false,
      };
    case chatsConstants.GET_SINGLE_CHAT_FAILURE:
      return {
        ...state,
        getSingleChatError: action.payload,
      };
    case chatsConstants.GET_OLDER_MESSAGE_SUCCESS:
      return {
        ...state,
        olderMessages: action.payload,
        getSingleChat: '',
      };
    case chatsConstants.GET_OLDER_MESSAGE_FAILURE:
      return {
        ...state,
        olderMessageError: action.payload,
      };
    case chatsConstants.FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        fileUploadStatus: action.payload,
      };
    case chatsConstants.FILE_UPLOAD_FAILURE:
      return {
        ...state,
        fileUploadError: action.payload,
      };
    case chatsConstants.SEND_AUDIO_SUCCESS:
      return {
        ...state,
        audioSentStatus: action.payload.status,
      };
    case chatsConstants.SEND_AUDIO_FAILURE:
      return {
        ...state,
        audioSentError: action.payload,
      };
    case chatsConstants.SHOW_LOADER_SUCCESS:
      return {
        ...state,
        [action.payload.type]: action.payload.status,
        audioSentStatus: false,
        fileUploadStatus: false,
      };
    case chatsConstants.SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUserResult: action.payload,
      };
    case chatsConstants.SEARCH_USER_FAILURE:
      return {
        ...state,
        searchUserError: action.payload,
      };
    case chatsConstants.SEND_MARK_AS_READ_SUCCESS:
      return {
        ...state,
        markAsRead: action.payload,
      };
    case chatsConstants.SEND_MARK_AS_READ_FAILURE:
      return {
        ...state,
        markAsReadError: action.error,
      };
    case chatsConstants.MUTE_USER_SUCCESS:
      return {
        ...state,
        isMuted: action.payload.isMuted.muted,
        newChatData: action.payload.newChatData,
      };
    case chatsConstants.MUTE_USER_FAILURE:
      return {
        ...state,
        muteError: action.error,
      };
    case chatsConstants.BLOCK_UNBLOCK_USER_SUCCESS:
      return {
        ...state,
        isUserBlocked: action.payload.isUserBlocked,
      };
    case chatsConstants.BLOCK_UNBLOCK_USER_FAILURE:
      return {
        ...state,
        blockError: action.error,
      };
    case chatsConstants.DELETE_CHAT_SUCCESS:
      return {
        ...state,
        isChatDeleted: action.payload.isChatDeleted,
        newChatData: action.payload.newChatData,
      };
    case chatsConstants.DELETE_CHAT_FAILURE:
      return {
        ...state,
        muteError: action.error,
      };
    case chatsConstants.LIKE_MESSAGE_SUCCESS:
      return {
        ...state,
        isLiked: action.payload.liked,
      };
    case chatsConstants.LIKE_MESSAGE_FAILURE:
      return {
        ...state,
        likeError: action.error,
      };
    case chatsConstants.UNSEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isMsgDeleted: action.payload.msgDeleted,
      };
    case chatsConstants.UNSEND_MESSAGE_FAILURE:
      return {
        ...state,
        deleteError: action.error,
      };
    case chatsConstants.GET_UNFOLLOWERS_SUCCESS:
      return {
        ...state,
        unfollowers: action.payload,
      };
    case chatsConstants.GET_UNFOLLOWERS_FAILURE:
      return {
        ...state,
        unfollowersError: action.error,
      };
    case chatsConstants.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        unfollowedStatus: action.payload,
      };
    case chatsConstants.UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        unfollowError: action.error,
      };
    case chatsConstants.FETCH_DIRECT_INBOX_RECORDS_SUCCESS:
      return {
        ...state,
        directInboxRecords: action.payload,
      };
    case chatsConstants.FETCH_DIRECT_INBOX_RECORDS_FAILURE:
      return {
        ...state,
        directInboxRecordsError: action.error,
      };
    case chatsConstants.FETCH_PENDING_INBOX_SUCCESS:
      return {
        ...state,
        pendingInboxRecords: action.payload,
      };
    case chatsConstants.FETCH_PENDING_INBOX_FAILURE:
      return {
        ...state,
        pendingInboxRecordsError: action.error,
      };
    case chatsConstants.RESET_CHAT_WINDOW_SUCCESS:
      return {
        ...state,
        resetChatWindow: action.payload,
      };
    default:
      return { ...state };
  }
}
