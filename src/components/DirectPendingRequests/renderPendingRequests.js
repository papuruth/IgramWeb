import { Avatar } from '@material-ui/core';
import { VolumeOff } from '@material-ui/icons';
import React from 'react';
import {
  getChatThumbnail,

  getChatTitle, getMsgDirection,

  getMsgPreview
} from '../DirectMessage/helperFunctions';

export default function RenderPendingRequests({
  requests,
  renderChat,
}) {
  const userList = [];
  requests.forEach((chat_) => {
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
      muted,
    };
    userList.push(li);
  });
  return (
    userList.length > 0 &&
    userList.map(
      ({
        chat,
        chatTitle,
        msgPreview,
        thumbnail,
        chatId,
        direction,
        muted,
      }) => {
        const msgPreviewClass = direction === 'outward' ? 'outward' : 'inward';
        return (
          <li
            key={chatId}
            className="col-12 p3"
            id={chatId ? `chatlist-${chatId}` : chatTitle}>
            {thumbnail && <Avatar alt="Remy Sharp" src={thumbnail} />}
            <div
              className="username ml-3 d-none d-sm-inline-block"
              onClick={() => renderChat(chat)}
              onKeyPress={() => renderChat(chat)}
              tabIndex={0}
              role="menuitem">
              <b>
                {chatTitle} {muted ? <VolumeOff /> : ''}
              </b>
              <br />
              <span className={msgPreviewClass}>{msgPreview}</span>
            </div>
          </li>
        );
      },
    )
  );
}
