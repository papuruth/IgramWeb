/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { Button } from '@material-ui/core';
import { CameraAlt, Close, InsertEmoticon, Mic, Pause, PlayArrow, Send, Stop } from '@material-ui/icons';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { emojiIndex, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import AudioAnalyser from 'react-audio-analyser';
import { Helmet } from 'react-helmet';
import ClipLoader from 'react-spinners/ClipLoader';
import instaIcon from '@/assets/images/icon.png';
import {
  fetchChatListAction,
  fileUploadAction,
  getSingleChatAction,
  resetChatWindowAction,
  searchUser,
  sendAudioAction,
  sendMessageAction,
  showLoaderAction
} from '@/redux/chats/chatsAction';
import history from '@/routes/history';
import Toast from '@/utils/toast';
import ChatBox from './ChatBox';
import './direct-message.css';
import { isActive, markAsRead, scrollToChatBottom, setActive } from './helperFunctions';
import { renderMessage, renderUnfollowers } from './rendererFunction';
import RenderSearchResult from './renderSearchResult';
import RenderUserList from './renderUserList';
import { imageUploadCssLoader, renderUserListLoader, StyledContainer } from './styles';

class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: '',
      renderChatFlag: false,
      singleChat: '',
      chatsList: [],
      searchText: '',
      searchUserResult: [],
      status: null,
      recordingStatus: null,
      audioSrc: null,
      messageText: '',
      unfollowers: [],
    };
    const { dispatch, user } = props;
    dispatch(fetchChatListAction(user?.username));
    window.loggedInUserId = props.user.pk;
  }

  static getDerivedStateFromProps(props, state) {
    const { user, authenticated, chatsList, getSingleChat, olderMessages, searchUserResult, unfollowers, resetChatWindow } = props;
    const stateObj = {};
    if (user !== state.user) {
      Object.assign(stateObj, { user });
    }

    if (authenticated !== state.authenticated) {
      Object.assign(stateObj, { authenticated });
    }

    if (chatsList !== state.chatsList) {
      Object.assign(stateObj, { chatsList });
    }
    if (olderMessages && !resetChatWindow) {
      if (Object.keys(state.singleChat).length && state.singleChat.items.length !== olderMessages.items.length) {
        const doc = document.querySelector('.messages');
        doc.scrollBy(0, 200);
        olderMessages.presence = state.singleChat.presence;
        Object.assign(stateObj, {
          singleChat: olderMessages,
          renderChatFlag: true,
        });
      }
    }
    if (getSingleChat !== state.singleChat && !olderMessages && !resetChatWindow) {
      Object.assign(stateObj, {
        singleChat: getSingleChat,
        renderChatFlag: true,
      });
    }
    if (searchUserResult !== state.searchUserResult) {
      Object.assign(stateObj, {
        searchUserResult,
      });
    }
    if (unfollowers !== state.unfollowers) {
      Object.assign(stateObj, {
        unfollowers,
      });
    }
    return stateObj;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    const {
      imageUploadLoader,
      audioUploadLoader,
      dispatch,
      getSingleChat,
      audioSentStatus,
      fileUploadStatus,
      chatLoader,
      searchUserResult,
      searchUserLoader,
      unfollowers,
      resetChatWindow,
    } = this.props;
    const getSingleChaRequestPayload = {
      chatId: window.currentChatId,
      isNewChat: !window.currentChatId,
    };
    if (resetChatWindow !== prevProps.resetChatWindow && resetChatWindow) {
      this.resetChat(resetChatWindow);
    }
    if (audioSentStatus !== prevProps.audioSentStatus && audioUploadLoader) {
      dispatch(getSingleChatAction(getSingleChaRequestPayload));
      Toast.success('Recording sent successfully');
      dispatch(showLoaderAction(false, 'audioUploadLoader'));
    }
    if (fileUploadStatus !== prevProps.fileUploadStatus && imageUploadLoader) {
      dispatch(getSingleChatAction(getSingleChaRequestPayload));
      Toast.success('Photo sent successfully');
      dispatch(showLoaderAction(false, 'imageUploadLoader'));
    }
    if (getSingleChat.thread_id !== prevProps.getSingleChat.thread_id || (getSingleChat.pk !== prevProps.getSingleChat.pk && chatLoader)) {
      dispatch(showLoaderAction(false, 'chatLoader'));
    }
    if (searchUserResult !== prevProps.searchUserResult && searchUserLoader) {
      dispatch(showLoaderAction(false, 'searchUserLoader'));
    }
    if (unfollowers !== prevProps.unfollowers) {
      renderUnfollowers(unfollowers, dispatch);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  resetChat = (flag) => {
    this.setState({
      singleChat: {},
      renderChatFlag: !flag,
    });
  };

  handleUserInput = (event) => {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => name === 'searchText' && this.handleUserSearch(value),
    );
  };

  handleUserSearch = (value) => {
    const { dispatch } = this.props;
    if (value.trim() === '' || value.trim().length > 0) {
      dispatch(showLoaderAction(true, 'searchUserLoader'));
      dispatch(searchUser(value.trim()));
      // Toast.info('Searching for user started, please wait!');
    }
  };

  handleKeyPress = (event) => {
    if (!event.shiftKey && event.keyCode === 13) {
      event.preventDefault();
      this.sendMessage();
    }
    if (event.keyCode === 65 && event.ctrlKey) {
      event.preventDefault();
      event.target.select();
    }
  };

  handleClickOutside = (event) => {
    if (
      this.emojiRef.previousSibling !== event.target.parentElement &&
      !this.emojiRef.contains(event.target) &&
      this.emojiToggleBtnRef !== event.target.parentElement
    ) {
      this.emojiRef.classList.add('hide');
    }
  };

  addEmoji = (emojiObj) => {
    const emoji = emojiObj.native;
    this.setState((state) => ({
      messageText: state.messageText + emoji,
    }));
  };

  sendMessage = () => {
    const { dispatch } = this.props;
    const { singleChat, messageText } = this.state;
    const isNewChat = !singleChat.thread_id;
    const chatId = singleChat.thread_id;
    const users = singleChat.pk;
    const messageObj = {
      isNewChat,
      text: messageText,
      timestamp: new Date().getTime(),
      users,
      chatId,
    };

    if (messageObj) {
      dispatch(sendMessageAction(messageObj));
      // Rendering current text
      const div = renderMessage(messageText, 'outward');
      const msgContainer = document.querySelector('.chat .messages');
      msgContainer.appendChild(div);
      scrollToChatBottom();
    }
    this.setState({
      messageText: '',
    });
  };

  renderChat = (chat_) => {
    const { dispatch } = this.props;
    const getSingleChaRequestPayload = {
      isNewChat: !chat_.thread_id,
      chatId: chat_.thread_id || chat_.pk,
      chatData: chat_,
    };
    dispatch(showLoaderAction(true, 'chatLoader'));
    const li = document.getElementById(`chatlist-${chat_.thread_id || chat_.pk}`);
    if (isActive(chat_)) setActive(li);
    setActive(li);
    if (chat_.thread_id) {
      markAsRead(chat_.thread_id, li);
      dispatch(getSingleChatAction(getSingleChaRequestPayload));
    } else {
      dispatch(getSingleChatAction(getSingleChaRequestPayload));
    }
    dispatch(resetChatWindowAction(false));
    window.currentChatId = chat_.pk || chat_.thread_id;
  };

  sendFile = () => {
    this.sendFileRef.click();
  };

  handleImageUpload = (event) => {
    const { dispatch } = this.props;
    const file = event.currentTarget.files[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('recepients', window.currentChatId);
      data.append('isNewChat', !window.currentChatId);
      data.append('chatId', window.currentChatId);
      dispatch(showLoaderAction(true, 'imageUploadLoader'));
      dispatch(fileUploadAction(data));
      Toast.info('Photo is being uploaded!😁');
    }
  };

  resetImageUpload = () => {
    this.sendFileRef.value = '';
  };

  showProfile = () => {
    document.getElementById('profiledropdown').classList = 'dropdown-menu active';
  };

  showEmojiPane = (event) => {
    event.preventDefault();
    if (this.emojiRef.classList.value === 'emojis hide') {
      this.emojiRef.classList.remove('hide');
    } else {
      this.emojiRef.classList.add('hide');
    }
  };

  hideProfile = () => {
    document.getElementById('profiledropdown').classList = 'dropdown-menu';
  };

  controlAudio = (status) => {
    this.setState(
      {
        status,
      },
      () => {
        if (status === 'inactive') {
          if (this.state.audioRecordEvent) {
            this.state.audioRecordEvent.currentTarget.stream.getTracks()[0].stop();
          }
        }
      },
    );
  };

  toggleRecording = (event) => {
    event.preventDefault();
    this.setState((state) => ({
      recordingStatus: !state.recordingStatus,
      recordComplete: false,
      audioSrc: null,
    }));
  };

  sendAudio = (event) => {
    event.preventDefault();
    const { audioSrc, singleChat } = this.state;
    const { dispatch } = this.props;
    if (audioSrc && singleChat) {
      const recepient = singleChat.thread_id;
      const audioObj = new FormData();
      audioObj.append('file', audioSrc);
      audioObj.append('recepient', recepient);
      dispatch(showLoaderAction(true, 'audioUploadLoader'));
      dispatch(sendAudioAction(audioObj));
      Toast.info('Audio is being uploaded!😁');
    } else {
      this.setState({
        status: null,
        recordComplete: false,
        recordingStatus: true,
        audioSrc: null,
      });
    }
  };

  fetchRequests = () => {
    const { location } = this.props;
    history.push('/direct/requests', {
      pending_requests_total: location.state.pending_requests_total,
    });
  };

  render() {
    const { renderChatFlag, chatsList, singleChat, audioSrc, status, recordingStatus, recordComplete, searchText, messageText } = this.state;
    const { user, dispatch, imageUploadLoader, audioUploadLoader, chatLoader, searchUserResult, searchUserLoader, location } = this.props;
    const audioProps = {
      audioType: 'audio/wav', // Temporarily only supported audio/wav, default audio/webm
      status, // Triggering component updates by changing status
      audioSrc,
      startCallback: (e) => {
        this.setState({
          audioRecordEvent: e,
        });
      },
      pauseCallback: () => {},
      stopCallback: (e) => {
        this.setState({
          audioSrc: e,
          recordComplete: true,
        });
      },
    };
    const isBlocked = Object.keys(singleChat).length && singleChat.users ? singleChat.users[0].friendship_status.blocking : false;
    if (isBlocked) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    return (
      <StyledContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Direct • Igram</title>
        </Helmet>
        <div className="container_fluid app">
          <div className="appBody">
            <div className={`chat-list${window.innerWidth > 576 ? ' col-4' : ''}`}>
              <div className="listStrapper">
                <div className="pending-request-wrapper">
                  <div className="chatlist-title">Messages</div>
                  {location?.state?.pending_requests_total && (
                    <div className="pending-request-content" role="button" onClick={this.fetchRequests} tabIndex={0}>
                      {`${location.state.pending_requests_total} Request`}
                    </div>
                  )}
                </div>
                <ul>
                  {!searchText && chatsList.length > 0 && <RenderUserList dispatch={dispatch} chatList={chatsList} renderChat={this.renderChat} />}
                  {!searchUserLoader && <RenderSearchResult dispatch={dispatch} usersList={searchUserResult} renderChat={this.renderChat} />}
                  {(searchText || !chatsList.length) && (!searchUserResult.length || searchUserLoader) && (
                    <ClipLoader css={renderUserListLoader} size={70} color="#123abc" loading />
                  )}
                </ul>
              </div>
            </div>
            <div className={`chat${window.innerWidth > 576 ? ' col-8' : ''}`}>
              {chatLoader && (
                <div className="messages row p-3 pt-5">
                  <ClipLoader css={imageUploadCssLoader} size={70} color="#123abc" loading={chatLoader} />
                </div>
              )}
              {renderChatFlag && !chatLoader && Object.keys(singleChat).length > 0 && (
                <ChatBox chatData={singleChat} user={user} key={window.currentChatId} dispatch={dispatch} />
              )}
              {!chatLoader && !renderChatFlag && (
                <div className="messages row p-3 pt-5">
                  <div className="center cover">
                    <img src={instaIcon} width="300px" alt="" />
                    <p className="italic">Search and select a chat to start.</p>
                  </div>
                </div>
              )}
              <ClipLoader css={imageUploadCssLoader} size={70} color="#123abc" loading={imageUploadLoader || audioUploadLoader} />
              {!isBlocked && (
                <div className="messageBox row p-3">
                  <div className="new-message">
                    <form>
                      {!recordingStatus ? (
                        <ReactTextareaAutocomplete
                          name="messageText"
                          maxLength="1000"
                          id="messageText"
                          ref={(textInput) => {
                            this.textInputRef = textInput;
                          }}
                          disabled={!renderChatFlag}
                          loadingComponent={() => <span>Loading</span>}
                          value={messageText}
                          onChange={this.handleUserInput}
                          onKeyDown={this.handleKeyPress}
                          placeholder="Message..."
                          trigger={{
                            ':': {
                              dataProvider: (token) =>
                                emojiIndex.search(token).map((o) => ({
                                  colons: o.colons,
                                  native: o.native,
                                })),
                              component: ({ entity: { native, colons } }) => <div>{`${colons} ${native}`}</div>,
                              output: (item) => `${item.native}`,
                            },
                          }}
                        />
                      ) : recordComplete ? (
                        <div>
                          <audio src={window.URL.createObjectURL(audioSrc)} controls />
                          <button className="send-audio" type="submit" onClick={this.toggleRecording} disabled={!renderChatFlag}>
                            <Send title="Send audio" onClick={this.sendAudio} />
                          </button>
                        </div>
                      ) : (
                        <AudioAnalyser {...audioProps}>
                          <div className="btn-box">
                            {status !== 'recording' && (
                              <PlayArrow className="iconfont icon-start" title="STart Recording" onClick={() => this.controlAudio('recording')} />
                            )}
                            {status === 'recording' && (
                              <Pause className="iconfont icon-pause" title="Pause Recording" onClick={() => this.controlAudio('paused')} />
                            )}
                            <Stop className="iconfont icon-stop" title="Stop Recording" onClick={() => this.controlAudio('inactive')} />
                          </div>
                        </AudioAnalyser>
                      )}
                    </form>
                  </div>
                  {!recordingStatus ? (
                    <button className="record-audio" type="submit" onClick={this.toggleRecording} disabled={!renderChatFlag}>
                      <Mic title="Record" />
                    </button>
                  ) : (
                    <button className="record-audio" type="submit" onClick={this.toggleRecording} disabled={!renderChatFlag}>
                      <Close title="Close Record" />
                    </button>
                  )}
                  <button className="send-attachment" type="submit" onClick={this.sendFile} disabled={!renderChatFlag}>
                    <CameraAlt />
                  </button>
                  <input
                    ref={(file) => {
                      this.sendFileRef = file;
                    }}
                    onChange={this.handleImageUpload}
                    onClick={this.resetImageUpload}
                    className="file-input hide"
                    type="file"
                    accept="image/jpeg,image/jpg"
                  />
                  <button
                    className="open-emoji"
                    type="submit"
                    ref={(emojiToggleBtn) => {
                      this.emojiToggleBtnRef = emojiToggleBtn;
                    }}
                    onClick={this.showEmojiPane}
                    disabled={!renderChatFlag}
                  >
                    <InsertEmoticon />
                  </button>
                  <div
                    className="emojis hide"
                    ref={(emoji) => {
                      this.emojiRef = emoji;
                    }}
                  >
                    <div className="emojis-body">
                      <Picker set="facebook" theme="dark" emojiTooltip title="React IGDM Emojis" onSelect={this.addEmoji} />
                    </div>
                  </div>
                </div>
              )}
              {isBlocked && (
                <div className="blockedWrapper row p-3">
                  <div className="blockedContent">
                    You blocked 
                    {' '}
                    {singleChat.thread_title}
                    .
                    {' '}
                    <Button color="primary" onClick={this.deleteChat}>
                      Delete Chat.
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </StyledContainer>
    );
  }
}

export default DirectMessage;
