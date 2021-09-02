/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Avatar from '@material-ui/core/Avatar';
import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { WORKER_URL } from '@/utils/constants';

const RenderSearchResult = ({ usersList, renderChat }) =>
  usersList.map((user) => {
    const { username, profile_pic_url, pk } = user;
    const chatTitle = username;
    const thumbnail = `${WORKER_URL}${profile_pic_url}`;
    return (
      <li
        key={pk}
        className="col-12 p3"
        id={pk ? `chatlist-${pk}` : chatTitle}
        onClick={() => renderChat(user)}
      >
        {thumbnail ? (
          <Avatar alt={chatTitle} src={thumbnail} />
        ) : (
          <Avatar alt={chatTitle} src={<AccountCircle />} />
        )}
        <div className="username ml-3 d-none d-sm-inline-block">
          <b>{chatTitle}</b>
          <br />
          <span className="inward">Send a message</span>
        </div>
      </li>
    );
  });

export default RenderSearchResult;
