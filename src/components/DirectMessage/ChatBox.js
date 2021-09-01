/* eslint-disable react/prop-types */
import Title from '@/containers/Title';
import React from 'react';
import MessageBox from './MessageBox';

const ChatBox = ({ chatData, user, dispatch, resetChatWindow }) => {
  const singleChat = chatData.length > 0
    ? chatData.filter((item) => item.thread_id === window.currentChatId)
    : chatData;
  return (
    <>
      <Title chat_={singleChat} resetChatWindow={resetChatWindow} />
      <MessageBox chat_={singleChat} user={user} dispatch={dispatch} />
    </>
  );
};

export default ChatBox;
