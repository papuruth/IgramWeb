/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import loadingIcon from '@/assets/images/loading.gif';
import {
  DUMMY_CHAT_ID,
  MSG_INPUT_SELECTOR,
  CHAT_WINDOW_SELECTOR,
} from '@/utils/constants';

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

export function openInBrowser(url) {
  window.open(url, '_blank', 'noopener noreferrer');
}

export function copyToCliboard(_text) {}

export function format(number) {
  return number > 9 ? `${number}` : `0${number}`;
}

export function formatTime(unixTime) {
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(parseInt(unixTime.toString().slice(0, 13), 10));
  const hours = format(date.getHours());
  const minutes = format(date.getMinutes());
  const day = format(date.getDate());
  const month = MONTHS[date.getMonth()];
  return `${hours}:${minutes} - ${month} ${day}`;
}

export function truncate(text, length) {
  return text.length > length ? `${text.substr(0, length)} ...` : text;
}

export function dom(content) {
  const template = document.createElement('template');
  template.innerHTML = content;
  return template.content.firstChild;
}

export function getUsernames(chat_) {
  const usernames = chat_.username;
  return usernames;
}

export function getChatTitle(chat_) {
  return chat_?.thread_title;
}

export function isGroupChat(chat_) {
  if (chat_ && chat_.is_group) {
    return true;
  }
  return false;
}

export function getChatThumbnail(chat_) {
  if (chat_.users[0] && !isGroupChat(chat_)) {
    return chat_.users[0].profile_pic_url;
  }
  return chat_.users.map((user) => user.profile_pic_url);
}

export function isCurrentChat(chat_) {
  if (window.currentChatId === DUMMY_CHAT_ID) {
    return !window.chatListHash[chat_.thread_id];
  }
  return chat_.thread_id === window.currentChatId;
}

export function setActive(el) {
  const currentActive = document.querySelector('.chat-list ul li.active');
  if (currentActive) {
    currentActive.classList.remove('active');
  }
  el.setAttribute('class', 'col-12 p3 active');
}

export function getMsgDirection(message) {
  if (message.user_id === window.loggedInUserId) return 'outward';
  return 'inward';
}

export function isOnline(chat) {
  return chat.presence ? chat.presence.is_active : false;
}

export function scrollToChatBottom() {
  setTimeout(() => {
    const doc = document.querySelector('.messages');
    doc.scrollBy(0, doc.scrollHeight);
  }, 1000);
}

export function conditionedScrollToBottom() {
  if (!window.gettingOlderMessages) {
    return scrollToChatBottom;
  }
}

export function loadOlderMsgsOnScrollTop(chatId) {
  const msgContainer = document.querySelector(CHAT_WINDOW_SELECTOR);
  msgContainer.onscroll = (e) => {
    if (
      e.target.scrollTop < 200
      && !window.gettingOlderMessages
      && window.currentChatId === chatId
    ) {
      // ipcRenderer.send('getOlderMessages', chatId);
      window.gettingOlderMessages = true;
      window.olderMessagesChatId = window.currentChatId;
    }
  };
}

export function canRenderOlderMessages(chatId) {
  chatId = chatId || window.olderMessagesChatId;
  return chatId === window.currentChatId;
}

export function getMsgPreview(chat_) {
  const msgPreview = chat_.items[0].text || 'Media message';
  return truncate(msgPreview, 25);
}

export function isActive(chat_) {
  return (chat_.thread_id || chat_.pk) === window.currentChatId;
}

export function markAsRead(id, li) {
  const chat_ = window.unreadChats[id];
  if (chat_) {
    li.classList.remove('notification');
    delete window.unreadChats[id];
    return true;
  }
  return false;
}

export function resetMessageTextArea() {
  const input = document.querySelector(MSG_INPUT_SELECTOR);
  input.value = '';

  const event = document.createEvent('Event');
  event.initEvent('input', true, true);
  input.dispatchEvent(event);
}

export function removeSubmitHandler() {
  const input = document.querySelector(MSG_INPUT_SELECTOR);
  input.onkeypress = () => {};
}

export function sendAttachment(filePath, chat_) {
  // @todo: pass this as argument instead
  window.notifiedChatId = chat_.thread_id;
  notify('Your file is being uploaded', true);
}

export function addAttachmentSender(chat_) {
  document.querySelector('.send-attachment').onclick = () => {
    const fileInput = document.querySelector('.file-input');
    fileInput.click();
    fileInput.onchange = () => {
      sendAttachment(fileInput.files[0].path, chat_);
      fileInput.value = '';
    };
  };
}

export function addNotification(el, chat_) {
  if (chat_.items[0].user_id === window.loggedInUserId) {
    return;
  }
  const isNew = (window.chatListHash[chat_.thread_id]
      && window.chatListHash[chat_.thread_id].items[0].item_id
        !== chat_.items[0].item_id)
    || (chat_.last_seen_at
      && chat_.last_seen_at[window.loggedInUserId]
      && chat_.items[0].item_id
        !== chat_.last_seen_at[window.loggedInUserId].item_id);
  if (isNew) {
    window.unreadChats[chat_.thread_id] = chat_;
  }
  if (window.unreadChats[chat_.thread_id]) {
    if (chat_.thread_id === window.chat.thread_id && document.hasFocus()) {
      markAsRead(chat_.thread_id, el);
    } else {
      el.classList.add('notification');
      window.notifiedChatId = el.getAttribute('id');
      return true;
    }
  }
}

export function notify(message, noBadgeCountIncrease) {
  if (!noBadgeCountIncrease) {
    // ipcRenderer.send('increase-badge-count');
  }
  const notification = new Notification('IG:dm Desktop', {
    body: message,
  });

  notification.onclick = () => {
    document.querySelector(`#${window.notifiedChatId}`).click();
  };
}

export function registerChatUser(chat_) {
  if (chat_.users.length === 1) {
    window.chatUsers[chat_.users[0].pk] = chat_.thread_id;
  }
}

export function getIsSeenText(chat_) {
  let text = '';
  if (
    !chat_.items
    || !chat_.items.length
    || chat_.items[0].user_id !== window.loggedInUserId
  ) {
    return '';
  }

  const seenBy = chat_.users.filter(
    (user) =>
      chat_.last_seen_at[user.pk]
      && chat_.last_seen_at[user.pk].item_id === chat_.items[0].item_id,
  );

  if (seenBy.length === chat_.users.length) {
    text = 'seen';
  } else if (seenBy.length) {
    text = `👁 ${getUsernames({ users: seenBy })}`;
  }
  return text;
}

export function showInViewer(ele) {
  const viewer = document.querySelector('.viewer');
  const viewerContent = viewer.querySelector('.viewer_content');
  viewer.classList.add('active');

  viewerContent.innerHTML = '';
  viewerContent.appendChild(ele);
  document.onkeyup = (e) => {
    if (e.keyCode === 27) {
      // ESC keycode
      viewer.classList.remove('active');
    }
  };
}

export function quoteText(text) {
  const input = document.querySelector(MSG_INPUT_SELECTOR);
  input.value = `${text}\n==================\n${input.value}`;
  input.focus();
}

export function setProfilePic() {
  const url = window.loggedInUser.profile_pic_url;
  const settingsButton = document.querySelector('.settings');
  settingsButton.style.backgroundImage = `url(${url})`;
}

export function getLoadingGif() {
  const loadingGIF = dom(
    `<div class="center">
      <img class="loadingGif" src=${loadingIcon} />
    </div>`,
  );

  return loadingGIF;
}

export function downloadFile(urlOfFile) {
  const element = document.createElement('a');
  element.setAttribute('href', urlOfFile);
  element.setAttribute('download', true);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function getHTMLElement(media) {
  let mediaContent;
  if (media.video_versions) {
    mediaContent = `<video width="${media.video_versions[0].width}" controls>
      <source src="${media.video_versions[0].url}" type="video/mp4">
    </video>`;
  } else {
    mediaContent = `<img src="${media.image_versions2[0].url}">`;
  }
  return mediaContent;
}

export function animateChatDelete(chatId) {
  return new Promise((resolve) => {
    const element = document.getElementById(`chatlist-${chatId}`);
    element.classList.add('delete-chat');
    setTimeout(() => {
      element.style.display = 'none';
      resolve(chatId);
    }, 600);
  });
}

export function removeChatFromChats(chatId) {
  if (
    window.currentChatId === chatId
    || window.currentChatId === DUMMY_CHAT_ID
  ) {
    resetChatScreen();
  }

  const chatUsers = Object.getOwnPropertyNames(window.chatUsers);
  chatUsers.forEach((userPk) => {
    if (window.chatUsers[userPk] === chatId) {
      delete window.chatUsers[userPk];
    }
  });

  delete window.chatListHash[chatId];

  window.chats = window.chats.filter((chat) => {
    if (chat.thread_id !== chatId) {
      return true;
    }
    return false;
  });

  window.chats = window.chats.filter((chat) => {
    if (chat.thread_id !== chatId) {
      return true;
    }
    return false;
  });
}

export function resetChatScreen() {
  // renderEmptyChat();
  removeSubmitHandler();
  window.currentChatId = null;
  window.chat = {};
}

export function queueInSending(chatId, message) {
  if (!chatId) {
    chatId = 'new-chat';
  }
  if (!window.messageInQueue[chatId]) {
    window.messageInQueue[chatId] = [];
  }
  window.messageInQueue[chatId].push(message);
}

export function dequeueFromSending(sentObj) {
  const { chatId, trackerKey } = sentObj;
  if (!window.messageInQueue[chatId]) {
    window.messageInQueue[chatId] = window.messageInQueue['new-chat'].slice();
    delete window.messageInQueue['new-chat'];
  }
  let queue = window.messageInQueue[chatId];
  queue = queue.filter(
    (messageQueued) => messageQueued.trackerKey !== trackerKey,
  );
  window.messageInQueue[chatId] = queue;
}

export function createSendingMessage(message, type, trackerKey) {
  return {
    text: message,
    item_type: type,
    user_id: window.loggedInUserId,
    timestamp: undefined,
    trackerKey,
  };
}

export function createThumbnailDom(imageUrls) {
  if (typeof imageUrls === 'string') {
    return dom(`<div><img class="thumb" src="${imageUrls}"></div>`);
  }
  let html = '<div>';
  imageUrls.forEach((imageUrl, index) => {
    if (index < 5) {
      html += `<img class="thumb ${
        index === 0 ? '' : 'group'
      }" src="${imageUrl}"></img>`;
    }
  });
  html += '</div>';
  return dom(html);
}
