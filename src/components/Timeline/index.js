/* eslint-disable jsx-a11y/control-has-associated-label */
/** @jsx jsx */
import { ReactComponent as Comment } from '@/assets/images/comment.svg';
import { ReactComponent as Like } from '@/assets/images/Like.svg';
import { ReactComponent as SharePost } from '@/assets/images/SharePost.svg';
import { jsx } from '@emotion/core';
import { ButtonBase, Divider, InputBase, Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, BookmarkBorder, MoreHoriz } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import _ from 'lodash';
import * as moment from 'moment';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';
import BigPlayButton from 'video-react/lib/components/BigPlayButton';
import ControlBar from 'video-react/lib/components/control-bar/ControlBar';
import Shortcut from 'video-react/lib/components/Shortcut';
import Toast from '@/utils/toast';
import { ReactComponent as Unlike } from '@/assets/images/Unlike.svg';
import { WORKER_URL } from '@/utils/constants';
import { changeGreetingFlagAction } from '@/redux/user/userAction';
import {
  fetchUserReelAction,
  likeMediaAction,
  mediaCommentAction,
  timelineAction,
  unlikeMediaAction,
} from '@/redux/timeline/timelineAction';
import RenderStories from '@/containers/RenderStories';
import {
  IGDMFooterCopyright,
  IGDMFooterWrapper,
  StoriesReelCarouselButton,
  StoriesReelCarouselItemCanvas,
  StoriesReelCarouselItemCaptionDiv,
  StoriesReelCarouselItemContentDiv,
  StoriesReelCarouselItemImageWrapperSpan,
  StoriesReelCarouselItemImg,
  StoriesReelCarouselItemWrapperDiv,
  StoriesReelContentContainerDiv,
  StoriesReelWrapperContainerDiv,
  StyledContainer,
  TimelineSection,
  userSuggestedLink,
  UserSuggestionFullname,
  UserSuggestionProfileContent,
  UserSuggestionProfileImage,
  UserSuggestionProfileImageIMG,
  UserSuggestionProfileImageSpan,
  UserSuggestionProfileWrapper,
  UserSuggestionSection,
  UserSuggestionSuggestedUserContent,
  UserSuggestionSuggestedUserContent1,
  UserSuggestionSuggestedUserContent2,
  UserSuggestionSuggestedUserContentWrapper,
  UserSuggestionSuggestedUserHeading,
  UserSuggestionSuggestedUserHeadingAnchor,
  UserSuggestionSuggestedUserHeadingAnchorContent,
  UserSuggestionSuggestedUserHeadingContent,
  UserSuggestionSuggestedUserHeadingWrapper,
  UserSuggestionSuggestedUserMainDIV,
  UserSuggestionSuggestedUserMainDIV1,
  UserSuggestionSuggestedUserMainDIV1Anchor,
  UserSuggestionSuggestedUserMainDIV1Canvas,
  UserSuggestionSuggestedUserMainDIV1Content,
  UserSuggestionSuggestedUserMainDIV1IMG,
  UserSuggestionSuggestedUserMainDIV2,
  UserSuggestionSuggestedUserMainDIV2UnameAnchor,
  UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV1,
  UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV2,
  UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV3,
  UserSuggestionSuggestedUserMainDIV2UnameContent,
  UserSuggestionSuggestedUserMainDIV2UnameWrapper,
  UserSuggestionSuggestedUserMainDIV2Utype,
  UserSuggestionSuggestedUserMainDIV2UtypeDIV1,
  UserSuggestionSuggestedUserMainDIV2Verified,
  UserSuggestionSuggestedUserMainDIV3,
  UserSuggestionSuggestedUserMainDIV3Btn,
  UserSuggestionSuggestedUserWrapper,
  UserSuggestionUsernameAnchor,
  UserSuggestionUsernameContent,
  UserSuggestionUsernameWrapper,
  Verified,
} from './styles';
import './timeline.css';

const useStyles = (theme) => ({
  root: {
    maxWidth: '616px',
    marginBottom: '1rem',
    boxShadow:
      '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 5px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      maxWidth: `${window.innerWidth}px`,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  spanRight: {
    marginLeft: '8px',
    color: '#000!important',
    '& a': {
      color: '#00376b!important',
      marginLeft: '8px',
    },
  },
  likeIcon: {
    fill: 'red',
  },
  likeAvatar: {
    width: '20px',
    height: '20px',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  cardcontent: {
    padding: '0px 16px',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  video_views: {
    fontWeight: 600,
    color: '#000',
    fontSize: '16px',
  },
  hideReadMore: {
    display: 'none',
  },
  readMore: {
    fontWeight: 600,
    background: 0,
  },
  caption_text_less: {
    overflowWrap: 'break-word',
  },
  commentBox: {
    paddingTop: '10px',
    margin: '0px -16px',
  },
  commentButton: {
    position: 'absolute',
    right: '16px',
    color: '#0095f6',
    fontWeight: 600,
    top: '15px',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  commentInputWrapper: {
    position: 'relative',
  },
  commentInput: {
    height: '100%',
    minHeight: '56px',
    paddingLeft: '16px',
    width: '100%',
    maxWidth: 'calc(100% - 50px)',
  },
  dateTime: {
    marginTop: '8px',
    fontSize: '11px',
    color: '#ababab',
    '& a:active': {
      color: '#0095f6!important',
    },
  },
  cardImage: {
    width: '100%',
    maxHeight: '700px',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      maxHeight: `${window.innerWidth}px`,
    },
  },
});

const LikeTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

class Timeline extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      captionFull: false,
      captionLess: true,
      captionFullId: '',
      winWidth: window.innerWidth,
      captionLessId: '',
      commentText: '',
      mountStories: false,
      storyUserId: '',
    };
    this.newShortcuts = [
      // Press number 1 to jump to the postion of 10%
      {
        keyCode: 32 || 75, // k or spacebar
        // handle is the function to control the player
        // player: the player's state
        // actions: the player's actions
        handle: (player, actions) => {
          if (player.hasStarted) {
            actions.pause({
              action: 'pause',
              source: 'shortcut',
            });
            window.scrollBy(window.scrollY, 819);
          }
        },
      },
      {
        keyCode: 38, // Up arrow
        handle: () => {}, // override it's default handle
      },
      // Ctrl/Cmd + Right arrow to go forward 30 seconds
      {
        keyCode: 39, // Right arrow
        ctrl: true, // Ctrl/Cmd
        handle: () => {},
      },
    ];
  }

  componentDidMount() {
    const { user, greetingsFlag, dispatch } = this.props;
    setTimeout(() => {
      if (greetingsFlag) {
        Toast.info(
          `Hello, ${
            user.full_name || user.username
          }! Welcome to IGDM React Web.`,
        );
        dispatch(changeGreetingFlagAction(false));
      }
    }, 0);
    // subscribe state change
    try {
      this.player.subscribeToStateChange(this.handleStateChange);
      const videoTag = document.getElementsByTagName('video');
      Array.from(videoTag).forEach((element) =>
        element.setAttribute('onContextMenu', 'return false;'),
      );
    } catch (error) {
      console.log(error.message);
    }
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate() {
    // subscribe state change
    try {
      this.player.subscribeToStateChange(this.handleStateChange);
      const videoTag = document.getElementsByTagName('video');
      Array.from(videoTag).forEach((element) =>
        element.setAttribute('onContextMenu', 'return false;'),
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  handleWindowResize = (event) => {
    const { innerWidth } = event.target;
    this.setState({
      winWidth: innerWidth,
    });
  };

  renderCarousel = (media) => {
    const { classes } = this.props;
    return media.map(({ id, image_versions2, video_versions }) => {
      const mediaUrl = `${WORKER_URL}${image_versions2?.candidates[0]?.url}`;
      if (image_versions2 && video_versions) {
        const videoUrl = `${WORKER_URL}${video_versions[0].url}`;
        return (
          <Player
            playsInline
            ref={(player) => {
              this.player = player;
            }}
            key={id.split('_')[0]}
          >
            <source src={videoUrl} />
            <Shortcut dblclickable={false} shortcuts={this.newShortcuts} />
            <ControlBar disableCompletely className="my-class" />
            <BigPlayButton position="center" />
          </Player>
        );
      }
      return (
        <img
          src={mediaUrl}
          alt=""
          className={classes.cardImage}
          key={id.split('_')[0]}
        />
      );
    });
  };

  fetchMoreData = () => {
    const { dispatch, user } = this.props;
    const { username } = user;
    dispatch(timelineAction(username));
  };

  handleExpandClick = () => {
    this.setState((state) => ({
      expanded: !state.expanded,
    }));
  };

  handleUserInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleStateChange = (state, prevState) => {
    const { ended } = state;
    if (ended !== prevState.ended) {
      this.player.play();
    }
  };

  likeUnlikePost = (mediaId, has_liked) => {
    const { dispatch, user } = this.props;
    const { username } = user;
    if (has_liked) {
      dispatch(unlikeMediaAction(mediaId, 'feed_timeline', username));
    } else {
      dispatch(likeMediaAction(mediaId, 'feed_timeline', username));
    }
  };

  openComment = (mediaId) => {
    console.log(mediaId);
  };

  sharePost = (mediaId) => {
    console.log(mediaId);
  };

  savePost = (mediaId) => {
    console.log(mediaId);
  };

  parseString = (str) => {
    const replacedCR = str.replace(/\n/g, '');
    const splitUsername = replacedCR
      .split(/(@\S*)/g)
      .filter((item) => item.trim());
    const splitHashTag = replacedCR
      .split(/(#\S*)/g)
      .filter((item) => item.trim());
    splitUsername.forEach((item, index) => {
      if (item.match(/(@\S*)/g)) {
        splitUsername[index] = (
          <Link to={`/${item.slice(1)}`} key={item}>
            {item}
          </Link>
        );
      }
    });
    splitHashTag.forEach((item, index) => {
      if (item.match(/(#\S*)/g)) {
        splitHashTag[index] = (
          <Link to={`/${item.slice(1)}`} key={item}>
            {item}
          </Link>
        );
      }
    });
    splitUsername.forEach((ele, index) => {
      if (typeof ele === 'object') {
        splitHashTag[index] = ele;
      }
    });
    return splitHashTag;
  };

  showFullCaption = (event, id) => {
    this.setState({
      captionFull: true,
      captionFullId: id,
      captionLess: false,
      captionLessId: id,
    });
  };

  handleSubmit = (event, mediaId) => {
    if (!event.shiftKey && event.keyCode === 13) {
      this.postComment(event, mediaId);
    }
  };

  postComment = (event, mediaId) => {
    event.preventDefault();
    const { commentText } = this.state;
    const { dispatch, user } = this.props;
    const { username } = user;
    dispatch(mediaCommentAction(commentText, mediaId, username));
    this.setState({
      commentText: '',
    });
  };

  renderStories = (storyUserId, ranked_position, storyIndex) => {
    this.setState({
      mountStories: true,
      storyPosition: ranked_position,
      storyUserId,
      storyIndex,
    });
  };

  closeStoryContainer = () => {
    this.setState({
      mountStories: false,
    });
    const { dispatch, user } = this.props;
    const { username } = user;
    dispatch(fetchUserReelAction(username));
  };

  render() {
    const { data, hasMore, classes, userReels, user, history, suggestedUser } =
      this.props;
    console.log(this.props);
    const filteredTImeline =
      data && data.filter((item) => 'media_or_ad' in item);
    const {
      expanded,
      captionFull,
      captionLess,
      commentText,
      captionFullId,
      captionLessId,
      winWidth,
      mountStories,
      storyUserId,
      storyPosition,
      storyIndex,
    } = this.state;
    const timelineMediaResponsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    const userReelResponsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 7,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 5,
      },
    };
    const storiesArray = winWidth > 600 ? Array(8).fill(0) : Array(4).fill(0);
    const suggestedUserArray = Array(5).fill(0);
    const userLoggedInStory =
      userReels.length > 0 && user.pk === userReels[0].user.pk
        ? userReels[0]
        : '';
    return (
      <StyledContainer>
        <TimelineSection>
          <StoriesReelWrapperContainerDiv>
            <StoriesReelContentContainerDiv>
              {userReels.length > 0 ? (
                <Carousel
                  slidesToSlide={5}
                  responsive={userReelResponsive}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {userReels
                    // .slice(2)
                    .map(({ id, user, seen, ranked_position, items }) => {
                      const storyIndex =
                        seen && items
                          ? _.findIndex(items, ['taken_at', seen])
                          : 0;
                      const { profile_pic_url, username } = user;
                      return (
                        <StoriesReelCarouselItemWrapperDiv key={id}>
                          <StoriesReelCarouselButton
                            role="menuitem"
                            tabIndex="0"
                            onClick={() =>
                              this.renderStories(
                                user.pk,
                                ranked_position,
                                storyIndex,
                              )}
                          >
                            <StoriesReelCarouselItemContentDiv>
                              <StoriesReelCarouselItemCanvas
                                borderColor={
                                  seen !== items[items.length - 1].taken_at
                                }
                              />
                              <StoriesReelCarouselItemImageWrapperSpan
                                aria-label="Open Stories"
                                role="button"
                                tabIndex="0"
                              >
                                <StoriesReelCarouselItemImg
                                  src={`${WORKER_URL}${profile_pic_url}`}
                                  alt="cover media"
                                />
                              </StoriesReelCarouselItemImageWrapperSpan>
                            </StoriesReelCarouselItemContentDiv>
                            <StoriesReelCarouselItemCaptionDiv
                              role="menuitem"
                              tabIndex="0"
                            >
                              {username}
                            </StoriesReelCarouselItemCaptionDiv>
                          </StoriesReelCarouselButton>
                        </StoriesReelCarouselItemWrapperDiv>
                      );
                    })}
                </Carousel>
              ) : (
                <Carousel
                  slidesToSlide={3}
                  responsive={userReelResponsive}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {storiesArray.map((num, index) => {
                    return (
                      <StoriesReelCarouselItemWrapperDiv
                        key={'SkeletonList'.concat(index)}
                      >
                        <StoriesReelCarouselButton role="menuitem" tabIndex="0">
                          <StoriesReelCarouselItemContentDiv>
                            <StoriesReelCarouselItemImageWrapperSpan
                              aria-label="Open Stories"
                              role="button"
                              tabIndex="0"
                            >
                              <Skeleton
                                animation="wave"
                                variant="circle"
                                width="100%"
                                height="100%"
                              />
                            </StoriesReelCarouselItemImageWrapperSpan>
                          </StoriesReelCarouselItemContentDiv>
                          <Skeleton animation="wave" height={10} width="40%" />
                        </StoriesReelCarouselButton>
                      </StoriesReelCarouselItemWrapperDiv>
                    );
                  })}
                </Carousel>
              )}
            </StoriesReelContentContainerDiv>
          </StoriesReelWrapperContainerDiv>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.fetchMoreData}
            hasMore={hasMore || false}
            loader=""
            threshold={2000}
          >
            {filteredTImeline.length > 0 ? (
              filteredTImeline.map(({ media_or_ad }) => {
                const item = media_or_ad;
                if (item) {
                  const { username, profile_pic_url } = item.user;
                  const isAd =
                    'ad_action' in item ||
                    'ad_header' in item ||
                    'ad_header_style' in item;
                  const location = item.location ? item.location.name : '';
                  const mediaUrl = item.image_versions2
                    ? `${WORKER_URL}${item.image_versions2?.candidates[0]?.url}`
                    : '';
                  const videoUrl = item.video_versions
                    ? `${WORKER_URL}${item?.video_versions[0]?.url}`
                    : null;
                  const isCarousel = 'carousel_media' in item;
                  const isCaption = 'caption' in item && item.caption;
                  const {
                    has_liked,
                    top_likers,
                    facepile_top_likers,
                    like_count,
                    code,
                    comment_count,
                    view_count,
                    preview_comments,
                    taken_at,
                  } = item;
                  const liker =
                    facepile_top_likers &&
                    facepile_top_likers.filter(
                      (likerItem) => likerItem.username === top_likers[0],
                    )[0];
                  return (
                    !isAd && (
                      <Card className={classes.root} key={item.pk}>
                        <CardHeader
                          avatar={(
                            <Avatar
                              aria-label="user_image"
                              alt={username}
                              className={classes.avatar}
                              src={`${WORKER_URL}${profile_pic_url}` || <AccountCircle />}
                            />
                          )}
                          action={(
                            <IconButton aria-label="settings">
                              <MoreHoriz />
                            </IconButton>
                          )}
                          title={username}
                          subheader={location}
                        />
                        {!isCarousel && (
                          <div>
                            {videoUrl ? (
                              <Player
                                ref={(player) => {
                                  this.player = player;
                                }}
                                playsInline
                              >
                                <source src={videoUrl} />
                                <Shortcut
                                  dblclickable={false}
                                  shortcuts={this.newShortcuts}
                                />
                                <ControlBar
                                  disableCompletely
                                  className="my-class"
                                />
                                <BigPlayButton position="center" />
                              </Player>
                            ) : (
                              <img
                                alt="media"
                                src={mediaUrl}
                                className={classes.cardImage}
                              />
                            )}
                          </div>
                        )}
                        {isCarousel && (
                          <div className="center">
                            <div className="carousel">
                              <Carousel
                                showDots
                                responsive={timelineMediaResponsive}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={['tablet', 'mobile']}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                              >
                                {this.renderCarousel(item.carousel_media)}
                              </Carousel>
                            </div>
                          </div>
                        )}
                        <CardActions disableSpacing>
                          <IconButton
                            aria-label={has_liked ? 'Unlike' : 'Like'}
                            onClick={() =>
                              this.likeUnlikePost(item.id, has_liked)}
                          >
                            {has_liked ? <Unlike /> : <Like />}
                          </IconButton>
                          <IconButton
                            aria-label="comment"
                            onClick={() => this.openComment(item.id)}
                          >
                            <Comment />
                          </IconButton>
                          <IconButton
                            aria-label="share"
                            onClick={() => this.sharePost(item.id)}
                          >
                            <SharePost />
                          </IconButton>
                          <IconButton
                            onClick={() => this.savePost(item.id)}
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: expanded,
                            })}
                            aria-expanded={expanded}
                            aria-label="show more"
                          >
                            <BookmarkBorder />
                          </IconButton>
                        </CardActions>

                        <CardContent className={classes.cardcontent}>
                          {top_likers && liker && top_likers?.length > 0 && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="div"
                            >
                              <span>
                                <Avatar
                                  className={classes.likeAvatar}
                                  alt={liker?.username}
                                  src={`${WORKER_URL}${liker?.profile_pic_url}`}
                                />
                              </span>
                              <span className={classes.spanRight}>
                                Lked by
                                <Link
                                  to={`/${liker.username}`}
                                  style={{
                                    marginLeft: '.25em',
                                    color: '#000',
                                    fontWeight: '500',
                                  }}
                                >
                                  {liker.username}
                                </Link>
                                {' '}
                                and
                                <a
                                  href={`https://instagram.com/p/${code}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    marginLeft: '.25em',
                                    color: '#000',
                                    fontWeight: '500',
                                  }}
                                >
                                  {like_count}
                                  {' '}
                                  others.
                                </a>
                              </span>
                            </Typography>
                          )}
                          {view_count && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="div"
                            >
                              <LikeTooltip
                                title={`${like_count} likes`}
                                arrow
                                placement="top-start"
                              >
                                <span className={classes.video_views}>
                                  {view_count}
                                  {' '}
                                  views
                                </span>
                              </LikeTooltip>
                            </Typography>
                          )}
                          {isCaption && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <span>
                                <a
                                  style={{ color: '#000', fontWeight: '500' }}
                                  href={`https://instagram.com/${username}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {username}
                                </a>
                              </span>
                              {(captionLess || captionLessId !== item.pk) && (
                                <span
                                  className={`${classes.spanRight} ${classes.caption_text_less}`}
                                >
                                  {item?.caption?.text?.substring(0, 50)}
                                </span>
                              )}
                              {captionFull && captionFullId === item.pk && (
                                <Typography
                                  variant="body1"
                                  component="span"
                                  className={`${classes.spanRight} ${classes.caption_text_full}`}
                                >
                                  {this.parseString(item.caption.text).map(
                                    (ele, i) => (
                                      <React.Fragment key={'caption'.concat(i)}>
                                        {ele}
                                        {'\n'}
                                      </React.Fragment>
                                    ),
                                  )}
                                </Typography>
                              )}
                              {(captionLess || captionLessId !== item.pk) && (
                                <button
                                  className={classes.readMore}
                                  type="button"
                                  onClick={(e) =>
                                    this.showFullCaption(e, item.pk)}
                                >
                                  ...&nbsp;more
                                </button>
                              )}
                            </Typography>
                          )}
                          {comment_count > 0 && (
                            <Typography
                              variant="body1"
                              component="div"
                              color="textSecondary"
                              className={classes.comment}
                              onClick={() => this.openComment(item.id)}
                            >
                              <span>
                                View all
                                {' '}
                                {comment_count}
                                {' '}
                                comments
                              </span>
                            </Typography>
                          )}
                          {preview_comments &&
                            preview_comments.map(({ pk, text, user }) => {
                              const mentionUsername = text
                                .split(' ')
                                .filter((item) => item.match(/(?:@)/));
                              const extraText = text
                                .split(' ')
                                .filter((item) => !item.match(/(?:@\w*)+/))
                                .join(' ');
                              return (
                                <Typography
                                  key={pk}
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  <span>
                                    <Link
                                      style={{
                                        color: '#000',
                                        fontWeight: '500',
                                      }}
                                      to={`/${user.username}`}
                                    >
                                      {user.username}
                                    </Link>
                                  </span>
                                  <span className={classes.spanRight}>
                                    {mentionUsername.map((mention) => (
                                      <Link
                                        to={`/${mention.slice(1)}`}
                                        key={mention}
                                      >
                                        {mention}
                                      </Link>
                                    ))}
                                    {' '}
                                    {extraText}
                                  </span>
                                </Typography>
                              );
                            })}
                          <Typography
                            variant="body1"
                            className={classes.dateTime}
                          >
                            <Link to={`/post/${code}`}>
                              <time
                                dateTime={moment.unix(taken_at).format()}
                                title={moment
                                  .unix(taken_at)
                                  .format('MMM DD, YYYY')}
                              >
                                {moment.unix(taken_at).fromNow().toUpperCase()}
                              </time>
                            </Link>
                          </Typography>
                          <Typography
                            variant="body1"
                            component="div"
                            className={classes.commentBox}
                          >
                            <Divider />
                            <div className={classes.commentInputWrapper}>
                              <form
                                onSubmit={(event) =>
                                  this.postComment(event, item.id)}
                                method="POST"
                              >
                                <ButtonBase
                                  className={classes.commentButton}
                                  type="submit"
                                  disabled={!commentText}
                                >
                                  Post
                                </ButtonBase>
                                <InputBase
                                  type="text"
                                  className={classes.commentInput}
                                  name="commentText"
                                  value={commentText}
                                  autoComplete="off"
                                  placeholder="Add a comment..."
                                  onChange={this.handleUserInput}
                                  onKeyDown={(event) =>
                                    this.handleSubmit(event, item.id)}
                                  multiline
                                />
                              </form>
                            </div>
                          </Typography>
                        </CardContent>
                      </Card>
                    )
                  );
                }
                return null;
              })
            ) : (
              <Card className={classes.root}>
                <CardHeader
                  avatar={<Skeleton variant="circle" width={40} height={40} />}
                  action={null}
                  title={<Skeleton animation="wave" height={10} width="40%" />}
                  subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                  }
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width={616}
                  height={616}
                />
                <CardContent>
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton animation="wave" height={10} width="40%" />
                  <Skeleton animation="wave" height={10} width="40%" />
                </CardContent>
              </Card>
            )}
          </InfiniteScroll>
        </TimelineSection>
        {winWidth >= 1000 && (
          <UserSuggestionSection
            style={{
              left: `${
                winWidth > 1400 ? (winWidth * 61) / 100 : (winWidth * 68) / 100
              }px`,
            }}
          >
            <UserSuggestionProfileWrapper>
              <UserSuggestionProfileContent>
                <UserSuggestionProfileImage role="button" tabIndex="0">
                  <StoriesReelCarouselItemCanvas
                    borderColor={
                      userLoggedInStory &&
                      userLoggedInStory.seen !==
                        userLoggedInStory.items[
                          userLoggedInStory.items.length - 1
                        ].taken_at
                    }
                  />
                  <UserSuggestionProfileImageSpan>
                    <UserSuggestionProfileImageIMG
                      alt="papuruth's profile"
                      src={`${WORKER_URL}${user?.profile_pic_url}`}
                      onClick={() =>
                        userLoggedInStory
                          ? this.renderStories(
                              userLoggedInStory.user.pk,
                              userLoggedInStory.ranked_position,
                              storyIndex,
                            )
                          : history.push(`/${user.username}`)}
                    />
                  </UserSuggestionProfileImageSpan>
                </UserSuggestionProfileImage>
                <UserSuggestionUsernameWrapper>
                  <UserSuggestionUsernameContent>
                    <UserSuggestionUsernameAnchor href={`/${user.username}`}>
                      {user.username}
                    </UserSuggestionUsernameAnchor>
                  </UserSuggestionUsernameContent>
                  {user.full_name && (
                    <UserSuggestionFullname>
                      {user.full_name}
                    </UserSuggestionFullname>
                  )}
                </UserSuggestionUsernameWrapper>
              </UserSuggestionProfileContent>
            </UserSuggestionProfileWrapper>
            <UserSuggestionSuggestedUserWrapper>
              <UserSuggestionSuggestedUserHeadingWrapper>
                <UserSuggestionSuggestedUserHeading>
                  <UserSuggestionSuggestedUserHeadingContent>
                    Suggestions For You
                  </UserSuggestionSuggestedUserHeadingContent>
                </UserSuggestionSuggestedUserHeading>
                <UserSuggestionSuggestedUserHeadingAnchor href="/explore/people/">
                  <UserSuggestionSuggestedUserHeadingAnchorContent>
                    See All
                  </UserSuggestionSuggestedUserHeadingAnchorContent>
                </UserSuggestionSuggestedUserHeadingAnchor>
              </UserSuggestionSuggestedUserHeadingWrapper>
              <UserSuggestionSuggestedUserContentWrapper>
                <UserSuggestionSuggestedUserContent>
                  <UserSuggestionSuggestedUserContent1>
                    <UserSuggestionSuggestedUserContent2>
                      {suggestedUser.length > 0
                        ? suggestedUser
                            .slice(0, 5)
                            .map(
                              ({
                                user,
                                is_new_suggestion,
                                followed_by,
                                social_context,
                              }) => (
                                <UserSuggestionSuggestedUserMainDIV
                                  key={user.pk}
                                >
                                  <UserSuggestionSuggestedUserMainDIV1>
                                    <UserSuggestionSuggestedUserMainDIV1Content
                                      role="button"
                                      tabIndex="0"
                                    >
                                      <UserSuggestionSuggestedUserMainDIV1Canvas />
                                      <Link
                                        css={userSuggestedLink}
                                        to={{
                                          pathname: `/${user.username}`,
                                          state: user,
                                        }}
                                      >
                                        <UserSuggestionSuggestedUserMainDIV1IMG
                                          alt={`${user.username} profile pic`}
                                          src={`${WORKER_URL}${user?.profile_pic_url}`}
                                        />
                                      </Link>
                                    </UserSuggestionSuggestedUserMainDIV1Content>
                                  </UserSuggestionSuggestedUserMainDIV1>
                                  <UserSuggestionSuggestedUserMainDIV2>
                                    <UserSuggestionSuggestedUserMainDIV2UnameWrapper>
                                      <UserSuggestionSuggestedUserMainDIV2UnameContent>
                                        <UserSuggestionSuggestedUserMainDIV2UnameAnchor
                                          to={{
                                            pathname: `/${user.username}`,
                                            state: user,
                                          }}
                                        >
                                          <UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV1>
                                            <UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV2>
                                              <UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV3
                                                title={user.username}
                                              >
                                                {user.username}
                                                {user.is_verified && (
                                                  <UserSuggestionSuggestedUserMainDIV2Verified>
                                                    <Verified title="Verified" />
                                                  </UserSuggestionSuggestedUserMainDIV2Verified>
                                                )}
                                              </UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV3>
                                            </UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV2>
                                          </UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV1>
                                        </UserSuggestionSuggestedUserMainDIV2UnameAnchor>
                                      </UserSuggestionSuggestedUserMainDIV2UnameContent>
                                    </UserSuggestionSuggestedUserMainDIV2UnameWrapper>
                                    <UserSuggestionSuggestedUserMainDIV2Utype>
                                      <UserSuggestionSuggestedUserMainDIV2UtypeDIV1>
                                        {is_new_suggestion
                                          ? 'New to Instagram'
                                          : social_context}
                                      </UserSuggestionSuggestedUserMainDIV2UtypeDIV1>
                                    </UserSuggestionSuggestedUserMainDIV2Utype>
                                  </UserSuggestionSuggestedUserMainDIV2>
                                  <UserSuggestionSuggestedUserMainDIV3>
                                    <UserSuggestionSuggestedUserMainDIV3Btn type="button">
                                      {followed_by &&
                                        !user.is_private &&
                                        'Following'}
                                      {followed_by &&
                                        user.is_private &&
                                        'Requested'}
                                      {!followed_by && 'Follow'}
                                    </UserSuggestionSuggestedUserMainDIV3Btn>
                                  </UserSuggestionSuggestedUserMainDIV3>
                                </UserSuggestionSuggestedUserMainDIV>
                              ),
                            )
                        : suggestedUserArray.map((num, index) => (
                          <UserSuggestionSuggestedUserMainDIV
                            key={'SuggestedUserSkeleton'.concat(index)}
                          >
                            <UserSuggestionSuggestedUserMainDIV1>
                              <UserSuggestionSuggestedUserMainDIV1Content
                                role="button"
                                tabIndex="0"
                              >
                                <UserSuggestionSuggestedUserMainDIV1Canvas />
                                <UserSuggestionSuggestedUserMainDIV1Anchor href="/">
                                  <Skeleton
                                    animation="wave"
                                    variant="circle"
                                    width="100%"
                                    height="100%"
                                  />
                                </UserSuggestionSuggestedUserMainDIV1Anchor>
                              </UserSuggestionSuggestedUserMainDIV1Content>
                            </UserSuggestionSuggestedUserMainDIV1>
                            <UserSuggestionSuggestedUserMainDIV2>
                              <UserSuggestionSuggestedUserMainDIV2UnameWrapper>
                                <UserSuggestionSuggestedUserMainDIV2UnameContent>
                                  <UserSuggestionSuggestedUserMainDIV2UnameAnchor href="/">
                                    <UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV1>
                                      <UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV2>
                                        <UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV3>
                                          <Skeleton
                                            animation="wave"
                                            height={10}
                                            width="40%"
                                          />
                                        </UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV3>
                                      </UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV2>
                                    </UserSuggestionSuggestedUserMainDIV2UnameAnchorDIV1>
                                  </UserSuggestionSuggestedUserMainDIV2UnameAnchor>
                                </UserSuggestionSuggestedUserMainDIV2UnameContent>
                              </UserSuggestionSuggestedUserMainDIV2UnameWrapper>
                              <UserSuggestionSuggestedUserMainDIV2Utype>
                                <UserSuggestionSuggestedUserMainDIV2UtypeDIV1>
                                  <Skeleton
                                    animation="wave"
                                    height={10}
                                    width="40%"
                                  />
                                </UserSuggestionSuggestedUserMainDIV2UtypeDIV1>
                              </UserSuggestionSuggestedUserMainDIV2Utype>
                            </UserSuggestionSuggestedUserMainDIV2>
                            <UserSuggestionSuggestedUserMainDIV3>
                              <Skeleton
                                animation="wave"
                                height={20}
                                width="50px"
                              />
                            </UserSuggestionSuggestedUserMainDIV3>
                          </UserSuggestionSuggestedUserMainDIV>
                          ))}
                    </UserSuggestionSuggestedUserContent2>
                  </UserSuggestionSuggestedUserContent1>
                </UserSuggestionSuggestedUserContent>
              </UserSuggestionSuggestedUserContentWrapper>
            </UserSuggestionSuggestedUserWrapper>
            <IGDMFooterWrapper>
              <IGDMFooterCopyright>© 2020 IGDM React</IGDMFooterCopyright>
            </IGDMFooterWrapper>
          </UserSuggestionSection>
        )}
        {mountStories && (
          <RenderStories
            closeStoryContainer={this.closeStoryContainer}
            storyUserId={storyUserId}
            storyPosition={storyPosition}
            currentIndex={storyIndex}
            userReels={userReels}
          />
        )}
      </StyledContainer>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Timeline);
