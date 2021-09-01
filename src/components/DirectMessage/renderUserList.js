/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { sendMarkAsReadAction } from '@/redux/chats/chatsAction';
import Toast from '@/utils/toast';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { VolumeOff } from '@material-ui/icons';
import React, { Component } from 'react';
import {
  addNotification,
  getChatThumbnail,
  getChatTitle,
  getMsgDirection,
  getMsgPreview,
  isActive,
  isOnline,
  markAsRead,
  registerChatUser,
  scrollToChatBottom,
} from './helperFunctions';
import { renderMessage } from './rendererFunction';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
class RenderUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notif: {},
    };
  }

  componentDidMount() {
    const { chatList } = this.props;
    chatList.forEach(async (chat_) => {
      const liEle = document.getElementById(`chatlist-${chat_.thread_id}`);
      const resultNotif = addNotification(liEle, chat_);
      window.chatListHash[chat_.thread_id] = chat_;
      if (resultNotif) {
        const { notif } = this.state;
        const newNotif = { [chat_.thread_id]: { markAsRead: true } };
        this.setState({
          notif: { ...notif, ...newNotif },
        });
        Toast.info(
          `You have a new ${
            typeof chat_.items[0].text === 'string' ? 'text' : 'media'
          } message from ${getChatTitle(chat_)}${
            chat_.items[0].text ? ': '.concat(chat_.items[0].text) : '.'
          }`,
        );
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { notif } = this.state;
    const { chatList, dispatch } = this.props;
    if (chatList !== prevProps.chatList) {
      chatList.forEach(async (chat_) => {
        const liEle = document.getElementById(`chatlist-${chat_.thread_id}`);
        const resultNotif = addNotification(liEle, chat_);
        window.chatListHash[chat_.thread_id] = chat_;
        if (resultNotif) {
          if (!(chat_.thread_id in notif)) {
            const newNotif = { [chat_.thread_id]: { markAsRead: true } };
            this.setState({
              notif: { ...notif, ...newNotif },
            });
            if (!isActive(chat_)) {
              Toast.info(
                `You have a new ${
                  typeof chat_.items[0].text === 'string' ? 'text' : 'media'
                } message from ${getChatTitle(chat_)}${
                  chat_.items[0].text ? ': '.concat(chat_.items[0].text) : '.'
                }`,
              );
            }
          }
          if (isActive(chat_)) {
            const readResult = markAsRead(chat_.thread_id, liEle);
            if (
              readResult
              && chat_.thread_id in notif
              && notif[chat_.thread_id].markAsRead
            ) {
              dispatch(sendMarkAsReadAction(chat_));
              delete notif[chat_.thread_id];
              this.setState({
                notif,
              });
              const messageText = chat_.items[0].text;
              const div = renderMessage(messageText, 'inward');
              const msgContainer = document.querySelector('.chat .messages');
              msgContainer.appendChild(div);
              scrollToChatBottom();
            }
          }
        }
      });
    }
  }

  render() {
    const { chatList, renderChat } = this.props;
    const userList = [];
    chatList.forEach((chat_) => {
      const presence = isOnline(chat_);
      const msgPreview = getMsgPreview(chat_);
      const chatTitle = getChatTitle(chat_);
      const direction = getMsgDirection(chat_.items[0]);
      const thumbnail = getChatThumbnail(chat_);
      const { muted } = chat_;
      const li = {
        chat: chat_,
        chatTitle,
        msgPreview,
        thumbnail,
        chatId: chat_.thread_id,
        direction,
        presence,
        muted,
      };
      userList.push(li);
      registerChatUser(chat_);
    });
    return userList.map(
      ({
        direction,
        chatId,
        chatTitle,
        thumbnail,
        chat,
        msgPreview,
        presence,
        muted,
      }) => {
        const msgPreviewClass = direction === 'outward' ? 'outward' : 'inward';
        return (
          <li
            key={chatId}
            className="col-12 p3"
            id={chatId ? `chatlist-${chatId}` : chatTitle}
            onClick={() => renderChat(chat)}
          >
            {typeof thumbnail === 'string' ? (
              presence ? (
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={thumbnail} />
                </StyledBadge>
              ) : (
                <Avatar alt="Remy Sharp" src={thumbnail} />
              )
            ) : (
              thumbnail.forEach((imageUrl, index) => {
                if (index < 5) {
                  return (
                    <div>
                      <img
                        className={`thumb ${index === 0 ? '' : 'group'}`}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                  );
                }
                return null;
              })
            )}
            <div className="username ml-3 d-none d-sm-inline-block">
              <b>
                {chatTitle}
                {' '}
                {muted ? <VolumeOff /> : ''}
              </b>
              <br />
              <span className={msgPreviewClass}>{msgPreview}</span>
            </div>
          </li>
        );
      },
    );
  }
}

export default RenderUserList;
