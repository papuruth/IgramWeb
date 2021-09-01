/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { unfollowUserAction } from '@/redux/chats/chatsAction';
import {
  formatTime,
  dom,
  getLoadingGif,
  showInViewer,
} from './helperFunctions';

/* eslint-disable no-unused-vars */
const DUMMY_CHAT_ID = 'fake id';
const MSG_INPUT_SELECTOR = '.new-message form textarea';
const CHAT_WINDOW_SELECTOR = '.chat .messages';
const CHAT_TITLE_SELECTOR = '.chat .chat-title';
const URL_REGEX = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  'i',
);

window.chats = [];
window.chatListHash = {};
window.chatCache = {};
window.unreadChats = {};
window.chat = {};
window.chatUsers = {};
window.currentChatId = null;
window.messageInQueue = {};
window.notifiedChatId = null;
window.loggedInUserId = null;
window.loggedInUser = null;
window.shouldSendSeenFlags = true;
window.isWindowFocused = true;
window.shouldNotify = true;
window.olderMessages = {};
window.gettingOlderMessages = false;
window.olderMessagesChatId = null;

function renderMessageAsText(container, message, direction) {
  container.appendChild(
    dom(`<div class="txtMessage_${direction}">${message}</div>`),
  );
}

export function renderMessage(message, direction) {
  const item_type = typeof message === 'string' ? 'text' : '';
  const time = new Date().getTime();
  const renderers = {
    text: renderMessageAsText,
  };

  const div = dom(`<div class="message clearfix ${direction}"></div>`);
  const divContent = dom('<div class="content"></div>');
  divContent.appendChild(dom('<p class="message-sender"></p>'));

  if (renderers[item_type]) renderers[item_type](divContent, message, direction);
  else {
    renderMessageAsText(
      divContent,
      `<unsupported message format: ${item_type}>`,
    );
  }

  divContent.appendChild(
    dom(
      `<p class="message-time">${
        time ? formatTime(Number(time)) : 'Sending...'
      }</p>`,
    ),
  );
  div.appendChild(divContent);

  return div;
}

const unfollow = (userId, dispatch) => {
  dispatch(unfollowUserAction(userId));
};

export function renderUnfollowers(users, dispatch) {
  const div = dom('<div id="unfollowers-view"></div>');
  if (typeof users === 'string' && users === 'loading') {
    div.appendChild(getLoadingGif());
    showInViewer(div);
    return;
  }
  const ul = dom('<ul class="unfollowers"></ul>');
  users.forEach((user) => {
    const li = dom(
      `<li class="col-12 col-md-4 col-lg-3">
        <img class="thumb" src="${user.profile_pic_url}">
        <div class="">${user.username}</div>
      </li>`,
    );
    const unfollowButton = dom(
      '<button class="unfollow-button">Unfollow</button>',
    );
    unfollowButton.onclick = () => {
      unfollow(user.pk, dispatch);
      li.remove();
    };
    li.appendChild(unfollowButton);
    ul.appendChild(li);
  });
  const unfollowers = document.querySelector('div#unfollowers-view');
  if (unfollowers) {
    unfollowers.innerHTML = '';
    unfollowers.appendChild(ul);
  }
}
