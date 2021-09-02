/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, withStyles } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { ClipLoader } from 'react-spinners';
import { ChevronLeft } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { loaderAction } from '@/redux/Loader/loaderAction';
import { pendingInboxRequestsAction } from '@/redux/chats/chatsAction';
import ChatBox from '../DirectMessage/ChatBox';
import { isActive, setActive } from '../DirectMessage/helperFunctions';
import RenderPendingRequests from './renderPendingRequests';
import {
  pendingChatBox,
  pendingChatBoxWelcomeContent,
  pendingChatBoxWelcomeHeading,
  pendingListActionContent,
  pendingMessageContent,
  pendingMessageContentInfo,
  pendingMessageContentNote,
  pendingMessageContentTitle,
  pendingMessageWrapper,
  pendingRequestActions,
  pendingRequestTxt,
  pendingRequestWrapper,
  StyledContainer,
  pendingRequestTitle,
  pendingRequestIconBack,
  pendingRequestListHeader,
} from './styles';

const styles = () => ({
  pendingRequestBtn: {
    borderRight: '1px solid rgba(0, 0, 0, 0.0975)',
    width: '100%',
  },
  pendingRequestBtnLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
class DirectPendingRequests extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mountPendingChat: false,
      pendingChat: {},
    };
    const { dispatch } = this.props;
    dispatch(pendingInboxRequestsAction());
    dispatch(loaderAction(true, 'pendingRequestLoader'));
  }

  renderPendingChat = (chat_) => {
    const li = document.getElementById(
      `chatlist-${chat_.thread_id || chat_.pk}`,
    );
    if (isActive(chat_)) setActive(li);
    setActive(li);
    window.currentChatId = chat_.pk || chat_.thread_id;
    this.setState({
      pendingChat: chat_,
      mountPendingChat: true,
    });
  };

  render() {
    const {
      pendingInboxRecords,
      pendingRequestLoader,
      dispatch,
      user,
      classes,
      location
    } = this.props;
    const { mountPendingChat, pendingChat } = this.state;
    const { inviter, thread_title } = pendingChat;
    return (
      <StyledContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Message Requests • Direct</title>
        </Helmet>
        <div className="container_fluid app">
          <div className="appBody">
            <div className="chat-list col-4">
              <div className="listStrapper row">
                <div css={pendingRequestWrapper}>
                  <div css={pendingRequestListHeader}>
                    <div css={pendingRequestIconBack}>
                      <Link to={{
                        pathname: '/direct/inbox',
                        state: {pending_requests_total: location.state.pending_requests_total}
                      }}
                      >
                        <ChevronLeft fontSize="large" />
                      </Link>
                    </div>
                    <div css={pendingRequestTitle}>Messages</div>
                  </div>
                  <div css={pendingRequestTxt}>
                    Requests aren&apos;t marked as seen until you accept them.
                  </div>
                </div>
                <ul>
                  {pendingInboxRecords.length > 0 && (
                    <RenderPendingRequests
                      requests={pendingInboxRecords}
                      renderChat={this.renderPendingChat}
                    />
                  )}
                  {!pendingInboxRecords.length && (
                    <ClipLoader
                      css={pendingRequestLoader}
                      size={70}
                      color="#123abc"
                      loading
                    />
                  )}
                </ul>
              </div>
              <div>
                <div css={pendingListActionContent}>
                  <Button
                    color="secondary"
                    classes={{ label: classes.pendingRequestBtnLabel }}
                    style={{ width: '100%' }}
                    onClick={this.deleteAllRequests}
                  >
                    Delete All
                  </Button>
                </div>
              </div>
            </div>
            <div className="chat col-8">
              {mountPendingChat && Object.keys(pendingChat).length > 0 && (
                <ChatBox
                  chatData={pendingChat}
                  key={window.currentChatId}
                  user={user}
                  dispatch={dispatch}
                />
              )}
              {!mountPendingChat && (
                <div className="messages row p-3 pt-5">
                  <div css={pendingChatBox}>
                    <p css={pendingChatBoxWelcomeHeading}>Message Requests</p>
                    <p css={pendingChatBoxWelcomeContent}>
                      These messages are from people you&apos;ve restricted or
                      don&apos;t follow. They won&apos;t know you viewed their
                      request until you allow them to message you.
                    </p>
                  </div>
                </div>
              )}
              {mountPendingChat && (
                <div css={pendingMessageWrapper}>
                  <div css={pendingMessageContent}>
                    <p css={pendingMessageContentTitle}>
                      <b>{thread_title}</b>
                      {' '}
                      wants to send you a message.
                    </p>
                    <p css={pendingMessageContentInfo}>
                      {inviter.follower_count}
                      {' '}
                      followers
                      {' '}
                      {inviter.media_count}
                      {' '}
                      posts
                    </p>
                    <p css={pendingMessageContentNote}>
                      Do you want to allow 
                      {' '}
                      {thread_title}
                      {' '}
                      to send you messages
                      from now on? They&apos;ll only know you&apos;ve seen their
                      request if you accept it.
                    </p>
                  </div>
                  <div css={pendingRequestActions}>
                    <Button
                      color="secondary"
                      classes={{
                        root: classes.pendingRequestBtn,
                        label: classes.pendingRequestBtnLabel,
                      }}
                      onClick={this.blockUser}
                    >
                      Block
                    </Button>
                    <Button
                      color="secondary"
                      classes={{
                        root: classes.pendingRequestBtn,
                        label: classes.pendingRequestBtnLabel,
                      }}
                      onClick={this.deleteChat}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      style={{ width: '100%', color: '#000' }}
                      classes={{ label: classes.pendingRequestBtnLabel }}
                      onClick={this.acceptRequest}
                    >
                      Accept
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

export default withStyles(styles)(DirectPendingRequests);
