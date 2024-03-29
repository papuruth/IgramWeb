/* eslint-disable react/prop-types */
import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { BookmarkBorderOutlined, GridOn, LiveTv } from '@material-ui/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import Toast from '@/utils/toast';
import { checkEmpty, equalityChecker } from '@/utils/commonFunctions';
import { searchExactUserAction } from '@/redux/user/userAction';
import { loaderStartAction } from '@/redux/Loader/loaderAction';
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
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box
          style={{
            marginTop: '20px',
          }}
        >
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
    const { dispatch, user, userFeeds, match } = props;
    const { username } = match?.params || {};
    dispatch(loaderStartAction());
    dispatch(searchExactUserAction(username, user, userFeeds));
  }

  componentDidUpdate(prevProps) {
    const { profilePhotoUpdated, profilePhotoRemoved, match, user, userFeeds, dispatch } = this.props;
    if (profilePhotoUpdated !== prevProps.profilePhotoUpdated && profilePhotoUpdated) {
      Toast.success('Profile photo updated.');
    }
    if (profilePhotoRemoved !== prevProps.profilePhotoRemoved && profilePhotoRemoved) {
      Toast.success('Profile photo removed.');
    }
    if (!checkEmpty(match?.params) && !equalityChecker(match?.params?.username, prevProps.match?.params?.username)) {
      const { username } = match?.params || {};
      dispatch(loaderStartAction());
      dispatch(searchExactUserAction(username, user, userFeeds));
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
    const { pk, is_private } = userInfo || {};
    const privateUser = is_private && pk !== user.pk;
    const suggestedUserData = Object.keys(suggestedUser).length > 0 && suggestedUser.users ? suggestedUser.users : '';
    const userHighlightsData = Object.keys(highlights).length > 0 && highlights.tray ? highlights.tray : '';
    const { following } = pk !== user.pk ? friendship : '';

    return (
      <StyledContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {full_name}
            {`${full_name ? ' @' : ''}${username} • Instagram photos and videos`}
          </title>
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
                  <Tabs value={tab} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab icon={<GridOn />} label="POSTS" />
                    <Tab icon={<LiveTv />} label="IGTV" />
                    <Tab icon={<BookmarkBorderOutlined />} label="SAVED" />
                  </Tabs>
                </Paper>
                <TabPanel value={tab} index={0}>
                  <RenderUserFeeds allFeeds={allFeeds} pk={pk} userFeeds={userFeeds} hasMore={hasMore} dispatch={dispatch} />
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
