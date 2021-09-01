import { connect } from 'react-redux';
import DirectMessage from '@/components/DirectMessage';

const mapStateToProps = (state) => {
  const { user, authenticated } = state.session;
  const {
    chatsList,
    chatListError,
    getSingleChat,
    getSingleChatError,
    sentMessageSuccessStatus,
    olderMessages,
    fileUploadStatus,
    audioSentStatus,
    audioSentError,
    showLoader,
    searchUserResult,
    chatLoader,
    imageUploadLoader,
    audioUploadLoader,
    searchUserLoader,
    resetChatWindow
  } = state.chatReducer;
  return {
    user,
    authenticated,
    chatsList: chatsList || [],
    chatListError,
    getSingleChat: getSingleChat || {},
    getSingleChatError,
    sentMessageSuccessStatus,
    olderMessages,
    chatLoader: chatLoader || false,
    searchUserResult: searchUserResult || [],
    fileUploadStatus: fileUploadStatus || false,
    audioSentStatus: audioSentStatus || false,
    showLoader: showLoader || false,
    audioSentError,
    imageUploadLoader: imageUploadLoader || false,
    audioUploadLoader: audioUploadLoader || false,
    searchUserLoader: searchUserLoader || false,
    resetChatWindow
  };
};

const connectedHome = connect(mapStateToProps)(DirectMessage);

export default connectedHome;
