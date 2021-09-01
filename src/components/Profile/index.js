/* eslint-disable react/prop-types */
import { loaderStartAction } from '@/redux/Loader/loaderAction';
import {
  fullUserInfoAction,
  searchExactUserAction,
  userFeedAction,
} from '@/redux/user/userAction';
import Toast from '@/utils/toast';
import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { BookmarkBorderOutlined, GridOn, LiveTv } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import { RenderPrivateAccount } from './renderPrivateAccount';
import { RenderProfileHeader } from './renderProfileHeader';
import RenderUserFeeds from './renderUserFeeds';
import { MainContainer, MainContainerWrapper, StyledContainer } from './styles';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  header: {
    padding: '30px 0px 30px 0px',
    marginBottom: '44px',
    backgroundColor: '#fafafa',
  },
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box
          style={{
            marginTop: '20px',
          }}>
          {children}
        </Box>
      )}
    </div>
  );
};

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tab: 0,
      showPrivate: false,
    };
    const { dispatch, user, userFeeds, location } = props;
    const { pk, is_private, username } = location?.state || user;
    console.log(is_private, location)
    if (is_private && location.state) {
      dispatch(loaderStartAction());
      dispatch(fullUserInfoAction(pk, user.pk, username));
      if (location?.pathname === user?.username) {
        dispatch(userFeedAction(pk, userFeeds, username));
      }
    } else if (!location.state && location?.pathname !== user.username) {
      dispatch(loaderStartAction());
      dispatch(searchExactUserAction(location?.pathname?.slice(1)));
    } else {
      dispatch(loaderStartAction());
      dispatch(fullUserInfoAction(pk, user.pk, username));
      if (location?.pathname === user?.username) {
        dispatch(userFeedAction(pk, userFeeds, username));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      user,
      location,
      searchExactUserInfo,
      profilePhotoUpdated,
      profilePhotoRemoved,
    } = this.props;
    console.log(location);
    const { pk, is_private, username } = location.state || user;
    if (location.pathname !== prevProps.location.pathname) {
      if (is_private && location?.state) {
        dispatch(loaderStartAction());
        dispatch(fullUserInfoAction(pk, user.pk, username));
        if (location?.pathname === user?.username) {
          dispatch(userFeedAction(pk, {}, username));
        }
      } else {
        dispatch(loaderStartAction());
        dispatch(fullUserInfoAction(pk, user.pk, username));
        if (location?.pathname === user?.username) {
          dispatch(userFeedAction(pk, {}, username));
        }
      }
    }
    if (
      !location.state &&
      Object.keys(prevProps.searchExactUserInfo).length === 0 &&
      username !== user.username
    ) {
      const userPk = searchExactUserInfo.pk;
      dispatch(loaderStartAction());
      dispatch(fullUserInfoAction(userPk, user.pk, username));
      if (location?.pathname === user?.username) {
        dispatch(userFeedAction(userPk, {}, username));
      }
    }

    if (
      profilePhotoUpdated !== prevProps.profilePhotoUpdated &&
      profilePhotoUpdated
    ) {
      Toast.success('Profile photo updated.');
    }
    if (
      profilePhotoRemoved !== prevProps.profilePhotoRemoved &&
      profilePhotoRemoved
    ) {
      Toast.success('Profile photo removed.');
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      tab: newValue,
    });
  };

  handleShowHideUserSuggestion = (value) => {
    this.setState((state) => {
      return {
        showPrivate: value !== state.showPrivate ? value : state.showPrivate,
      };
    });
  };

  render() {
    const {
      userInfo,
      classes,
      location,
      user,
      friendship,
      allFeeds,
      suggestedUser,
      highlights,
      userFeeds,
      hasMore,
      dispatch,
      profilePhotoLoader,
      unfollowers,
    } = this.props;
    const { username, full_name } = user;
    const { tab, showPrivate } = this.state;
    const { pk, is_private } = location.state ? userInfo : userInfo || user;
    const privateUser = is_private && pk !== user.pk;
    const suggestedUserData =
      Object.keys(suggestedUser).length > 0 && suggestedUser.users
        ? suggestedUser.users
        : '';
    const userHighlightsData =
      Object.keys(highlights).length > 0 && highlights.tray
        ? highlights.tray
        : '';
    const { following } = pk !== user.pk ? friendship : '';

    return (
      <StyledContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${full_name} ${
            full_name ? '(@${username})' : username
          } • Instagram photos and videos`}</title>
        </Helmet>
        <MainContainer>
          <MainContainerWrapper>
            {Object.keys(userInfo).length > 0 && user && (
              <Paper className={classes.header}>
                <RenderProfileHeader
                  userInfo={userInfo}
                  location={location}
                  user={user}
                  unfollowers={unfollowers}
                  profilePhotoLoader={profilePhotoLoader}
                  dispatch={dispatch}
                  friendship={friendship}
                  showHideUserSuggestion={this.handleShowHideUserSuggestion}
                />
              </Paper>
            )}
            <RenderPrivateAccount
              suggestedUserData={suggestedUserData}
              privateUser={privateUser}
              userHighlightsData={userHighlightsData}
              following={following}
              showPrivate={showPrivate}
            />
            {allFeeds.length > 0 && (
              <>
                <Paper className={classes.root}>
                  <Tabs
                    value={tab}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab icon={<GridOn />} label="POSTS" />
                    <Tab icon={<LiveTv />} label="IGTV" />
                    <Tab icon={<BookmarkBorderOutlined />} label="SAVED" />
                  </Tabs>
                </Paper>
                <TabPanel value={tab} index={0}>
                  <RenderUserFeeds
                    allFeeds={allFeeds}
                    pk={pk}
                    userFeeds={userFeeds}
                    hasMore={hasMore}
                    dispatch={dispatch}
                  />
                </TabPanel>
              </>
            )}
          </MainContainerWrapper>
        </MainContainer>
      </StyledContainer>
    );
  }
}

export default withStyles(useStyles)(Profile);
