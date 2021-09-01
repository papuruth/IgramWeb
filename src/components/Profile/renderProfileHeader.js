/* eslint-disable react/prop-types */
/** @jsx jsx */
import { ReactComponent as FollowedFriends } from '@/assets/images/followed.svg';
import { loaderAction } from '@/redux/Loader/loaderAction';
import {
  removeUserProfilePictureAction,
  updateUserProfilePictureAction,
  userLogout,
} from '@/redux/user/userAction';
import { formatNumber } from '@/utils/numberFormat';
import { jsx } from '@emotion/core';
import { blue } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowDropDown, MoreHoriz, Settings } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import './profile.component.css';
import { Link } from 'react-router-dom';
import { getUnfollowersAction } from '@/redux/chats/chatsAction';
import {
  accountDetaildFollowDownBtnWrapper,
  accountDetailsConfigWrapper,
  accountDetailsEditProfile,
  accountDetailsEditProfileBtn,
  accountDetailsFollowBtnContent,
  accountDetailsFollowBtnWrapper,
  accountDetailsFollowDownBtnContent,
  accountDetailsFollowedByContent,
  accountDetailsFollowedByWrapper,
  accountDetailsFollowedUser,
  accountDetailsFollowingListWrapper,
  accountDetailsFollowWrapper,
  accountDetailsInfoName,
  accountDetailsInfoWrapper,
  accountDetailsListContent,
  accountDetailsListContentChild,
  accountDetailsListContentChildSpan,
  accountDetailsSettingIconContent,
  accountDetailsSettingIconWrapper,
  accountDetailsUsername,
  accountDetailsVerified,
  accountDetailsWrapper,
  accountProfileContent,
  accountProfileContent1,
  accountProfileContentBtn,
  accountProfileHeader,
  accountProfileImage,
  accountProfilePicWrapper,
  ProfilePhotoLoaderDiv,
  profilePicInput,
} from './styles';
import { renderUnfollowers } from '../DirectMessage/rendererFunction';
import { WORKER_URL } from '@/utils/constants';

const useStyles = makeStyles((_theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  listTxtUpload: {
    color: '#0095f6',
    fontSize: '14px',
    fontWeight: '700!important',
    textAlign: 'center',
  },
  listTxtRemove: {
    color: '#ed4956',
    fontSize: '14px',
    fontWeight: '700!important',
    textAlign: 'center',
  },
  listTxtBorder: {
    borderTop: '1px solid #dbdbdb',
  },
  listTxtCancel: {
    fontSize: '14px',
    textAlign: 'center',
  },
  txtPosition: {
    textAlign: 'center',
    borderRadius: '12px',
  },
}));

export const RenderProfileHeader = ({
  userInfo,
  user,
  friendship,
  location,
  dispatch,
  profilePhotoLoader,
  showHideUserSuggestion,
  unfollowers,
}) => {
  const {
    pk,
    username,
    profile_pic_url,
    follower_count,
    following_count,
    has_anonymous_profile_picture,
    media_count,
    full_name,
    is_private,
    is_verified,
    external_url,
    category,
    biography,
    profile_context_mutual_follow_ids,
    profile_context_links_with_user_ids,
    mutual_followers_count,
  } = location.state ? userInfo : userInfo || user;
  let moreFollower;
  const mutualFollower = [];
  let followerArray;
  if (
    pk !== user.pk &&
    profile_context_links_with_user_ids &&
    profile_context_mutual_follow_ids &&
    mutual_followers_count
  ) {
    moreFollower =
      mutual_followers_count - profile_context_mutual_follow_ids.length;
    followerArray =
      profile_context_links_with_user_ids.length !==
      profile_context_mutual_follow_ids.length
        ? profile_context_links_with_user_ids.slice(
            0,
            profile_context_mutual_follow_ids.length,
          )
        : profile_context_links_with_user_ids;
    followerArray.forEach((item) => {
      mutualFollower.push(item.username);
    });
  }
  const { followed_by, following } = pk !== user.pk ? friendship : '';
  const privateUser = is_private && pk !== user.pk;
  const classes = useStyles();
  let uploadInputRef;
  const [showProfileChangeDialog, setProfileChangeDialog] = useState(false);
  const [showSettingChangeDialog, setSettingChangeDialog] = useState(false);
  const [showUserSuggestion, setUserSuggestion] = useState(!!privateUser);

  useEffect(() => {
    if (unfollowers) {
      renderUnfollowers(unfollowers, dispatch);
    }
  }, [unfollowers, dispatch]);

  const openProfileChanger = () => {
    if (!has_anonymous_profile_picture) {
      setProfileChangeDialog(true);
    } else {
      uploadInputRef.click();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('userId', pk);
      dispatch(updateUserProfilePictureAction(data));
      setProfileChangeDialog(false);
      dispatch(loaderAction(true, 'profilePhotoLoader'));
    }
  };
  const resetImageUpload = () => {
    uploadInputRef.value = '';
  };
  const closeProfileChanger = () => {
    setProfileChangeDialog(false);
  };
  const handlePhotoSelect = () => {
    uploadInputRef.click();
  };
  const handleRemovePhoto = () => {
    dispatch(removeUserProfilePictureAction());
    setProfileChangeDialog(false);
    dispatch(loaderAction(true, 'profilePhotoLoader'));
  };

  const showSettingChanger = () => {
    setSettingChangeDialog(true);
  };

  const closeSettingChanger = () => {
    setSettingChangeDialog(false);
  };

  const handleLogout = () => {
    setSettingChangeDialog(false);
    dispatch(userLogout(user.full_name, user.username));
  };

  const handleNonFollowers = () => {
    dispatch(getUnfollowersAction());
    renderUnfollowers('loading');
    setSettingChangeDialog(false);
  };

  const showHidePrivateArea = () => {
    showHideUserSuggestion(showUserSuggestion);
    setUserSuggestion(!showUserSuggestion);
  };

  const profileImageTitle = () => {
    if (pk === user.pk && has_anonymous_profile_picture) {
      return 'Add a profile photo';
    }
    if (pk === user.pk) {
      return 'Change Profile Photo';
    }
    return '';
  };

  return (
    <header css={accountProfileHeader}>
      <div css={accountProfilePicWrapper}>
        <div css={accountProfileContent}>
          <div css={accountProfileContent1}>
            <button
              css={accountProfileContentBtn}
              title={profileImageTitle()}
              type="button"
              onClick={pk === user.pk ? openProfileChanger : () => {}}>
              <img
                alt="Change Profile Pic"
                css={accountProfileImage}
                src={`${WORKER_URL}${profile_pic_url}`}
              />
            </button>
            {profilePhotoLoader && (
              <ProfilePhotoLoaderDiv>
                <FadeLoader color="#123abc" loading />
              </ProfilePhotoLoaderDiv>
            )}
            <Dialog
              onClose={closeProfileChanger}
              aria-labelledby="simple-dialog-title"
              classes={{
                paper: classes.txtPosition,
              }}
              open={showProfileChangeDialog}>
              <DialogTitle id="simple-dialog-title">
                Change Profile Photo
              </DialogTitle>
              <List>
                <ListItem
                  button
                  onClick={handlePhotoSelect}
                  key="Upload Photo"
                  className={classes.listTxtBorder}>
                  <ListItemText
                    primary="Upload Photo"
                    classes={{
                      primary: classes.listTxtUpload,
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={handleRemovePhoto}
                  key="Remove Current Photo"
                  className={classes.listTxtBorder}>
                  <ListItemText
                    primary="Remove Current Photo"
                    classes={{
                      primary: classes.listTxtRemove,
                    }}
                  />
                </ListItem>
                <ListItem
                  autoFocus
                  button
                  onClick={closeProfileChanger}
                  className={classes.listTxtBorder}>
                  <ListItemText
                    primary="Cancel"
                    classes={{
                      primary: classes.listTxtCancel,
                    }}
                  />
                </ListItem>
              </List>
            </Dialog>
            <div>
              <form
                encType="multipart/form-data"
                method="POST"
                role="presentation">
                <input
                  ref={(uploadInput) => {
                    uploadInputRef = uploadInput;
                  }}
                  onChange={handleImageUpload}
                  onClick={resetImageUpload}
                  accept="image/jpeg,image/png"
                  css={profilePicInput}
                  type="file"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <section css={accountDetailsWrapper}>
        <div css={accountDetailsConfigWrapper}>
          <h2 css={accountDetailsUsername}>{username}</h2>
          {is_verified && (
            <span css={accountDetailsVerified} title="Verified" />
          )}
          {!followed_by && !following && pk === user.pk && (
            <Link css={accountDetailsEditProfile} to="/accounts/edit">
              <button css={accountDetailsEditProfileBtn} type="button">
                Edit Profile
              </button>
            </Link>
          )}
          {following && (
            <a css={accountDetailsEditProfile} href={`/direct/${username}`}>
              <button css={accountDetailsEditProfileBtn} type="button">
                Message
              </button>
            </a>
          )}
          {following && (
            <span css={accountDetailsEditProfile}>
              <button css={accountDetailsEditProfileBtn} type="button">
                <FollowedFriends />
              </button>
            </span>
          )}
          {following && (
            <span css={accountDetailsEditProfile}>
              <button
                css={accountDetailsEditProfileBtn}
                type="button"
                onClick={showHidePrivateArea}>
                <ArrowDropDown />
              </button>
            </span>
          )}
          {!following && !followed_by && pk !== user.pk && (
            <span css={accountDetailsFollowWrapper}>
              <span css={accountDetailsFollowBtnWrapper}>
                <button css={accountDetailsFollowBtnContent} type="button">
                  Follow
                </button>
              </span>
              {!privateUser && (
                <span css={accountDetaildFollowDownBtnWrapper}>
                  <button
                    css={accountDetailsFollowDownBtnContent}
                    type="button"
                    onClick={showHidePrivateArea}>
                    <ArrowDropDown />
                  </button>
                </span>
              )}
            </span>
          )}
          <div css={accountDetailsSettingIconWrapper}>
            {!followed_by && !following && pk === user.pk && (
              <button
                css={accountDetailsSettingIconContent}
                type="button"
                onClick={showSettingChanger}>
                <Settings />
              </button>
            )}
            {pk !== user.pk && (
              <button css={accountDetailsSettingIconContent} type="button">
                <MoreHoriz />
              </button>
            )}
            <Dialog
              onClose={closeSettingChanger}
              aria-labelledby="simple-dialog-title"
              classes={{
                paper: classes.txtPosition,
              }}
              open={showSettingChangeDialog}>
              <List>
                <ListItem button onClick={handleLogout} key="Logout">
                  <ListItemText
                    primary="Logout"
                    classes={{
                      primary: classes.listTxtRemove,
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={handleNonFollowers}
                  className={classes.listTxtBorder}
                  key="NonFollowers">
                  <ListItemText
                    primary="Users Not Following"
                    classes={{
                      primary: classes.listTxtRemove,
                    }}
                  />
                </ListItem>
                <ListItem
                  autoFocus
                  button
                  onClick={closeSettingChanger}
                  className={classes.listTxtBorder}>
                  <ListItemText
                    primary="Cancel"
                    classes={{
                      primary: classes.listTxtCancel,
                    }}
                  />
                </ListItem>
              </List>
            </Dialog>
          </div>
        </div>
        <ul css={accountDetailsFollowingListWrapper}>
          <li css={accountDetailsListContent}>
            <span css={accountDetailsListContentChild}>
              <span
                css={accountDetailsListContentChildSpan}
                title={media_count}>
                {formatNumber(media_count)}
              </span>{' '}
              posts
            </span>
          </li>
          <li css={accountDetailsListContent}>
            <a
              css={accountDetailsListContentChild}
              href={`/${username}/followers/`}>
              <span
                css={accountDetailsListContentChildSpan}
                title={follower_count}>
                {formatNumber(follower_count)}
              </span>{' '}
              followers
            </a>
          </li>
          <li css={accountDetailsListContent}>
            <a
              css={accountDetailsListContentChild}
              href={`/${username}/following/`}>
              <span
                css={accountDetailsListContentChildSpan}
                title={following_count}>
                {formatNumber(following_count)}
              </span>{' '}
              following
            </a>
          </li>
        </ul>
        <div css={accountDetailsInfoWrapper}>
          <h1 css={accountDetailsInfoName}>{full_name}</h1>
          <br />
          {category && <span>{category}</span>}
          <span>
            {biography &&
              biography.split('\n').map((ele) => <p key={ele}>{ele}</p>)}
          </span>
          {external_url && (
            <span>
              <a
                href={external_url}
                target="_blank"
                rel="noopener noreferrer"
                css={{ color: '#007bff!important;', fontWeight: 600 }}>
                {external_url}
              </a>
            </span>
          )}
          {mutualFollower.length > 0 && (
            <a
              css={accountDetailsFollowedByWrapper}
              href={`${username}/followers/mutualOnly`}>
              <span css={accountDetailsFollowedByContent}>
                Followed by{' '}
                <span css={accountDetailsFollowedUser}>
                  {mutualFollower.join(', ')}
                </span>
                {' +'} {moreFollower} others.
              </span>
            </a>
          )}
        </div>
      </section>
    </header>
  );
};
