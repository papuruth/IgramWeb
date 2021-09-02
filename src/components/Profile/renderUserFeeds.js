/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/img-redundant-alt */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ImageListItemBar, IconButton, ImageList, ImageListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Favorite, PlayArrowRounded } from '@material-ui/icons';
import * as moment from 'moment';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import { userFeedAction } from '@/redux/user/userAction';
import { ReactComponent as Comment } from '@/assets/images/filled-comment.svg';
import { formatNumber } from '@/utils/numberFormat';
import { loaderCss } from './styles';
import { WORKER_URL } from '@/utils/constants';
import { randomIdGenerator } from '@/utils/commonFunctions';

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 'auto',
    height: '100%',
  },
  gridListTitle: {},
  title: {
    color: theme.palette.primary.light,
    flexGrow: '0.5',
  },
  titleBar: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  likeComment: { color: '#fff', fontSize: '14px' },
});

class RenderUserFeeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTitle: false,
      rowHeight: 300,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize()
  }

  updateRowHeight = (rowHeight) => {
    this.setState({ rowHeight });
  };

  handleWindowResize = () => {
    if (window.innerWidth > 1680) {
      this.updateRowHeight(300);
    } else if (window.innerWidth >= 1280) {
      this.updateRowHeight(300)
    } else if (window.innerWidth >= 1024) {
      this.updateRowHeight(300)
    } else if (window.innerWidth >= 992 ) {
      this.updateRowHeight(270);
    } else if (window.innerWidth > 576) {
      this.updateRowHeight(250);
    } else {
      this.updateRowHeight(100);
    }
  };

  showTitleBar = (id) => {
    document.getElementById(id).style.display = 'flex';
  };

  hideTitleBar = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  fetchMoreFeeds = () => {
    const { dispatch, pk, userFeeds } = this.props;
    dispatch(userFeedAction(pk, userFeeds));
  };

  render() {
    const { rowHeight } = this.state;
    const { allFeeds, hasMore, classes } = this.props;
    return (
      <div className={classes.root}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchMoreFeeds}
          hasMore={hasMore || false}
          loader={
            <div css={loaderCss} key="loaderUserFeed">
              <ClipLoader size={40} color="#123abc" loading />
            </div>
          }
          threshold={200}
        >
          <ImageList className={classes.imageList} rowHeight={rowHeight} cols={3}>
            {allFeeds.map((tile) => {
              const isCarousel = 'carousel_media' in tile;
              const isVideo = 'video_versions' in tile;
              const { image_versions2, carousel_media, taken_at, user, comment_count, like_count, view_count } = tile;
              const { full_name } = user;
              const time = moment.unix(taken_at).format('MMMM Do YYYY, h:mm:ss a');
              const mediaCoverUrl = image_versions2 && image_versions2.candidates[0].url;
              const carouselCoverUrl = carousel_media && carousel_media[0].image_versions2.candidates[0].url;
              return (
                <ImageListItem
                  key={randomIdGenerator()}
                  cols={1}
                  rows={1}
                  className={classes.gridListTitle}
                  onMouseEnter={() => this.showTitleBar(tile.pk)}
                  onMouseLeave={() => this.hideTitleBar(tile.pk)}
                >
                  <img
                    src={isCarousel ? `${WORKER_URL}${carouselCoverUrl}` : `${WORKER_URL}${mediaCoverUrl}`}
                    alt={`Photo shared by ${full_name} on ${time}`}
                  />
                  <ImageListItemBar
                    id={tile.pk}
                    classes={{
                      root: classes.titleBar,
                      titleWrap: classes.title,
                    }}
                    style={{ display: 'none' }}
                    actionIcon={
                      <span>
                        <IconButton aria-label="Likes">
                          {!isVideo && <Favorite className={classes.title} style={{ color: '#fff' }} />}
                          {isVideo && <PlayArrowRounded className={classes.title} style={{ color: '#fff' }} />}
                          {' '}
                          <span className={classes.likeComment}>{formatNumber(isVideo ? view_count : like_count)}</span>
                        </IconButton>
                        <IconButton aria-label="Comment">
                          <Comment className={classes.title} style={{ color: '#fff' }} />
                          {' '}
                          <span className={classes.likeComment}>{formatNumber(comment_count)}</span>
                        </IconButton>
                      </span>
                    }
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </InfiniteScroll>
      </div>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(RenderUserFeeds);
