/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { unsendMessageAction } from '@/redux/chats/chatsAction';
import { MoreHoriz } from '@material-ui/icons';
import React, { Component } from 'react';
import './carousel';
import { Avatar } from '@material-ui/core';
import * as moment from 'moment';
import { ReactComponent as Like } from '@/assets/images/Like.svg';
import { ReactComponent as Unlike } from '@/assets/images/Unlike.svg';
import likeHeart from '@/assets/images/heart.svg';
import {
  dom,
  formatTime,
  openInBrowser,
  showInViewer,
  truncate,
} from './helperFunctions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
      popMoreAction: false,
    };
  }

  // likeMessage = () => {
  //   const { dispatch } = this.props;
  // };

  unsendMessage = (msgId) => {
    const { dispatch, chat_ } = this.props;
    const { thread_id } = chat_;
    document.getElementById(msgId).remove();
    dispatch(unsendMessageAction(thread_id, msgId));
  };

  copyMessage = () => {};

  handlePopoverOpen = () => {
    this.setState({
      openPopover: true,
    });
  };

  popMoreAction = () => {
    this.setState({
      popMoreAction: true,
    });
  };

  closeMoreAction = () => {
    this.setState((state) => ({
      popMoreAction: !!state.openPopover,
    }));
  };

  handlePopoverClose = () => {
    this.setState({
      openPopover: false,
      popMoreAction: false,
    });
  };

  render() {
    const { message, user, chat_ } = this.props;
    const { openPopover, popMoreAction } = this.state;
    const imageHash = new Date().getTime();
    const direction =
      message && message.user_id === user.pk ? 'outward' : 'inward';
    const time = message && message.timestamp;
    let senderUsername = '';
    let senderAvatar = '';
    if (direction === 'inward') {
      const user1 = chat_.users
        ? chat_.users.find((ele) => ele.pk === message.user_id)
        : chat_;
      if (user1) {
        senderUsername = user1.username;
        senderAvatar = user1.profile_pic_url;
      }
    }

    function renderMessageReactions(reactions) {
      return (
        <div className="reactions-likes">
          {reactions.likes.map((like) => {
            if (like.sender_id === chat_.users[0].pk) {
              return (
                <React.Fragment key={reactions.likes[0].timestamp}>
                  <Like />
                  <img
                    src={chat_.users[0].profile_pic_url}
                    alt={chat_.users[0].username}
                    key={like.timestamp}
                  />
                </React.Fragment>
              );
            }
            return (
              <span key={reactions.likes[0].timestamp}>
                <Unlike />
                <img
                  src={chat_.inviter.profile_pic_url}
                  alt={chat_.inviter.username}
                  key={like.timestamp}
                />
              </span>
            );
          })}
        </div>
      );
    }

    const msgContainer = (
      message = '',
      classname = '',
      type = '',
      reactions = '',
      msgId = '',
    ) => (
      <div
        className={`content ${classname}`}
        id={message.item_type}
        onMouseEnter={this.popMoreAction}>
        {direction === 'inward' && (
          <div className="content_child">
            <a
              href={`https://instagram.com/${senderUsername}`}
              target="_blank"
              rel="noopener noreferrer">
              <Avatar
                alt={senderUsername}
                src={senderAvatar}
                style={{ width: '24px', height: '24px' }}
              />
            </a>
          </div>
        )}
        <div className="content_child">
          {type && (
            <div>
              <span className="message-sender">{senderUsername}</span>
              <span className={`message-time-${direction}`}>
                {time ? formatTime(time) : 'Sending...'}
              </span>
            </div>
          )}
          {typeof message === 'string' && (
            <div className={`txtMessage_${direction}`}>{message}</div>
          )}
          {!(typeof message === 'string') && message}
          {reactions && renderMessageReactions(reactions)}
        </div>
        {openPopover && (
          <div
            className={`popWrapper_${direction}`}
            onMouseLeave={this.handlePopoverClose}
            onMouseEnter={this.popMoreAction}>
            <div aria-hidden="false" className="popContentWrapper">
              <div className={`arrowWrapper_${direction}`}>
                <div className="arrowContent" />
              </div>
              <div className="popContent">
                <div className="popContent_Child">
                  <button
                    className="popContent_Child_Button"
                    type="button"
                    onClick={this.likeMessage}>
                    Like
                  </button>
                </div>
                <div className="popContent_Child">
                  <button
                    className="popContent_Child_Button"
                    type="button"
                    onClick={this.quoteMessage}>
                    Quote
                  </button>
                </div>
                {direction === 'outward' && (
                  <div className="popContent_Child">
                    <button
                      className="popContent_Child_Button"
                      type="button"
                      id={msgId}
                      onClick={() => this.unsendMessage(msgId)}>
                      Unsend
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {popMoreAction && message.item_type !== 'like' && (
          <div className={`moreIcon_${direction}`}>
            <MoreHoriz
              onMouseEnter={this.popMoreAction}
              onMouseLeave={this.closeMoreAction}
              onClick={this.handlePopoverOpen}
            />
          </div>
        )}
      </div>
    );
    function renderMessageAsText(message, _type, msgId) {
      const text =
        typeof message === 'string' ? message : message.text || message;
      return msgContainer(text, '', _type, message.reactions, msgId);
    }

    function renderMessageAsRavenImage(message, _type, msgId) {
      if (
        message.visual_media &&
        !message.visual_media.seen_count &&
        message.visual_media.media.image_versions2.candidates[1].url
      ) {
        const {
          url,
        } = message.visual_media.media.image_versions2.candidates[1];
        return msgContainer(
          <img
            src={url}
            alt=""
            onClick={() => showInViewer(dom(`<img src="${url}" alt="" />`))}
          />,
          'ig-media',
          null,
          message.reactions,
          msgId,
        );
      }
      return msgContainer(
        <>
          <p className="placeholder">Disapperaing Message</p>
          <p className="placeholder">Message Expired.</p>
        </>,
        '',
        null,
        null,
        msgId,
      );
    }

    function renderMessageAsImage(message, _type, msgId) {
      const url =
        typeof message === 'string'
          ? message
          : message.media.image_versions2.candidates[0].url;
      return msgContainer(
        <img
          src={url}
          alt=""
          onClick={() =>
            showInViewer(dom(`<img src="${url.concat(imageHash)}" alt=""/>`))
          }
        />,
        'ig-media',
        null,
        message.reactions,
        msgId,
      );
    }

    function renderPost(post, _type, _msgId) {
      const postDom = dom('<div class="center"></div>');
      if (post.video_versions) {
        postDom.appendChild(
          dom(`<video width="${post.video_versions[0].width}" controls>
            <source src="${post.video_versions[0].url}" type="video/mp4">
            </video>`),
        );
      } else if (post.carousel_media && post.carousel_media.length) {
        window.carouselInit(
          postDom,
          post.carousel_media.map((el) => el.image_versions2.candidates[0].url),
        );
      } else {
        postDom.appendChild(
          dom(
            `<img src="${post.image_versions2.candidates[0].url.concat(
              imageHash,
            )}"/>`,
          ),
        );
      }
      if (post.caption) {
        postDom.appendChild(
          dom(`<p class="post-caption">${post.caption.text}</p>`),
        );
      }
      const browserLink = dom(
        '<button class="view-on-ig">View on Instagram</button>',
      );
      browserLink.onclick = () =>
        openInBrowser(`https://instagram.com/${post.user.username}`);
      postDom.appendChild(browserLink);
      showInViewer(postDom);
    }

    function renderMessageAsPost(message, _type, msgId) {
      const post = message.media_share;
      if (post.image_versions2) {
        const img = (
          <>
            <img
              src={
                post.image_versions2.candidates[0].url.concat(imageHash) ||
                post.images[0][0].url.concat(imageHash)
              }
              alt=""
              onClick={() => renderPost(post)}
            />
            {post.caption && (
              <p className="post-caption">{truncate(post.caption.text, 30)}</p>
            )}
          </>
        );
        return msgContainer(img, 'ig-media', null, message.reactions, msgId);
      }
      if (post.carousel_media) {
        // carousels have nested arrays before getting to image url
        const img = (
          <>
            <img
              src={post.carousel_media[0].image_versions2.candidates[0].url.concat(
                imageHash,
              )}
              alt=""
              onClick={() => renderPost(post)}
            />
            {post.caption && (
              <p className="post-caption">{truncate(post.caption.text, 30)}</p>
            )}
          </>
        );
        return msgContainer(img, 'ig-media', null, message.reactions, msgId);
      }
      return null;
    }

    function renderMessageAsLike(message, _type, msgId) {
      return msgContainer(
        <span>
          <img className="heart" src={likeHeart} alt="heart" />
        </span>,
        '',
        message.item_type,
        null,
        msgId,
      );
    }

    function linkUsernames(text) {
      const splittedText = text.split(/@([\w.]+)/g);
      return (
        <span>
          {splittedText[0]}
          <a
            href={`https://instagram.com/${splittedText[1]}`}
            target="_blank"
            rel="noopener noreferrer">
            {splittedText[1]}
          </a>{' '}
          {splittedText[2]}
          <a
            href={`https://instagram.com/${splittedText[3]}`}
            target="_blank"
            rel="noopener noreferrer">
            {splittedText[3]}
          </a>
          {splittedText[4]}
        </span>
      );
    }

    function renderPlaceholderAsText(message, _type, msgId) {
      let html = '';
      if (!message.placeholder.is_linked) {
        html = message.placeholder.message;
      } else {
        html = linkUsernames(message.placeholder.message);
      }
      return renderMessageAsText(
        <>
          <p className="placeholder">{message.placeholder.title}</p>
          <p className="placeholder">{html}</p>
        </>,
        '',
        msgId,
      );
    }

    function renderMessageAsLink(message, _type, msgId) {
      const { link } = message;
      const {
        link_image_url,
        link_summary,
        link_title,
        link_url,
      } = link.link_context;
      const url = link_url;
      if (link_image_url) {
        return msgContainer(
          <div className="link-in-message">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <p>{link_url}</p>
              <img src={link_image_url.concat(imageHash)} alt="" />
            </a>
            {link_title && <p>{link_title}</p>}
            {link_summary && <p>{link_summary}</p>}
          </div>,
          '',
          null,
          null,
          msgId,
        );
      }
      return msgContainer(
        <div className="link-in-message">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          {link_title && <p>{link_title}</p>}
          {link_summary && <p>{link_summary}</p>}
        </div>,
        '',
        '',
        '',
        msgId,
      );
    }

    function renderMessageAsAnimatedMedia(message, _type, msgId) {
      const { url } = message.animated_media.images.fixed_height;
      return msgContainer(
        <img src={`${url}?alt=${imageHash}`} alt="" />,
        null,
        null,
        message.reactions && message.reactions,
        msgId,
      );
    }

    function renderMessageAsVoiceMedia(message, _type, msgId) {
      const src = message.voice_media.media.audio.audio_src;
      return msgContainer(
        <audio preload="auto" controls>
          <source src={src} />
          <track src="" kind="captions" srcLang="en" label="english_captions" />
        </audio>,
        null,
        null,
        null,
        msgId,
      );
    }

    function renderMessageAsUserStory(message, _type, msgId) {
      const { reel_share } = message || {};
      const { text, type, media } = reel_share || {};
      if (media?.image_versions2) {
        const { url } = media?.image_versions2?.candidates[1] || {};
        return msgContainer(
          <>
            <img
              src={url?.concat(imageHash)}
              className="story_reaction"
              alt=""
              onClick={() => {
                if (media?.video_versions) {
                  const videoUrl = media?.video_versions[0]?.url;
                  return showInViewer(
                    dom(`<video controls src="${videoUrl}">`),
                  );
                }
                return showInViewer(
                  dom(`<img src="${url.concat(imageHash)}">`),
                );
              }}
            />
            {text && type === 'reply' && <p>{text}</p>}
            {text && type === 'reaction' && (
              <p className={`story_reaction_text_${direction}`}>{text}</p>
            )}
          </>,
          '',
          type === 'reply' ? null : type,
          null,
          msgId,
        );
      }
      return msgContainer(
        <>
          <p className="post-caption">
            <i>Replied to their story</i>
          </p>
          {text && type === 'reply' && <p>{text}</p>}
          {text && type === 'reaction' && (
            <p className={`story_reaction_text_${direction}`}>{text}</p>
          )}
        </>,
        '',
        type === 'reply' ? null : type,
        null,
        msgId,
      );
    }

    function renderMessageAsStoryShare(msg, _type, msgId) {
      const { story_share } = msg;
      const { text, reel_type, media, title, message } = story_share;
      if (media && media.image_versions2) {
        const { url } = media.image_versions2.candidates[1];
        const { expiring_at, user } = media;
        const expired = expiring_at ? moment.now() > expiring_at : false;
        if (expired) {
          return msgContainer(
            <p className="placeholder">Sent {user.username} story.</p>,
            '',
            reel_type === 'user_reel' ? null : reel_type,
            null,
            msgId,
          );
        }
        return msgContainer(
          <>
            <img
              src={url.concat(imageHash)}
              className="story_reaction"
              alt=""
              onClick={() => {
                if (media.video_versions) {
                  const videoUrl = media.video_versions[0].url;
                  return showInViewer(
                    dom(`<video controls src="${videoUrl}">`),
                  );
                }
                return showInViewer(
                  dom(`<img src="${url.concat(imageHash)}">`),
                );
              }}
            />
            {text && reel_type === 'reply' && <p>{text}</p>}
            {text && reel_type === 'reaction' && (
              <p className={`story_reaction_text_${direction}`}>{text}</p>
            )}
          </>,
          '',
          reel_type === 'reply' ? null : reel_type,
          null,
          msgId,
        );
      }
      return msgContainer(
        <>
          <p className="placeholder">{title}</p>
          <p className="placeholder">{message}</p>
        </>,
        '',
        reel_type === 'user_reel' ? null : reel_type,
        null,
        msgId,
      );
    }
    // function renderMessageAsActionLog(message, type = null, msgId) {
    //   renderMessageAsText(message.action_log.description, type, msgId);
    // }

    const renderers = {
      media_share: renderMessageAsPost,
      text: renderMessageAsText,
      like: renderMessageAsLike,
      media: renderMessageAsImage,
      raven_media: renderMessageAsRavenImage,
      reel_share: renderMessageAsUserStory, // replying to a user's story
      link: renderMessageAsLink,
      animated_media: renderMessageAsAnimatedMedia,
      story_share: renderMessageAsStoryShare,
      // action_log: renderMessageAsActionLog,
      voice_media: renderMessageAsVoiceMedia,
      placeholder: renderPlaceholderAsText,
    };

    function renderByType(msgType, msgId) {
      let type = msgType;
      if (!type && typeof message === 'string') {
        type = 'text';
      }
      if (renderers[type]) return renderers[type](message, type, msgId);
      if (type === 'action_log') return false;
      return renderMessageAsText(`<unsupported message format: ${type}>`);
    }

    return (
      <div
        className={`message clearfix ${direction}`}
        key={chat_.pk || message.item_id}
        onMouseLeave={this.handlePopoverClose}
        id={message.item_id}>
        {message && renderByType(message.item_type, message.item_id)}
      </div>
    );
  }
}

export default Message;
