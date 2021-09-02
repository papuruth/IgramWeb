/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { getCurrentUserAction } from '@/redux/user/userAction';
import './edit.profile.css';
import toast from '@/utils/toast';
import RenderEditForm from './renderEditForm';
import {
  ContentAreaDiv,
  DrawerList,
  DrawerListActionArea,
  EditAccountMainContainer,
  EditAccountSection,
  ListItem,
  ListItemTextLink,
} from './styles';

const drawerListIems = [
  { text: 'Edit Profile', path: '/accounts/edit' },
  { text: 'Change Password', path: '/accounts/password/change' },
  { text: 'Apps and Websites', path: '/accounts/manage_access' },
  { text: 'Email and SMS', path: '/accounts/emails/settings' },
  { text: 'Push Notifications', path: '/accounts/push/settings' },
  { text: 'Manage Contacts', path: '/accounts/contacts' },
  { text: 'Privacy and Security', path: '/accounts/privacy' },
  { text: 'Login Activity', path: '/accounts/login_activity' },
  { text: 'Emails from Instagram', path: '/accounts/emails_sent' },
];
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { dispatch } = props;
    dispatch(getCurrentUserAction());
  }

  componentDidUpdate(prevProps) {
    const {profilePhotoUpdated, profilePhotoRemoved} = this.props;
    if (
      profilePhotoUpdated !== prevProps.profilePhotoUpdated &&
      profilePhotoUpdated
    ) {
      toast.success('Profile photo updated.');
    }
    if (
      profilePhotoRemoved !== prevProps.profilePhotoRemoved &&
      profilePhotoRemoved
    ) {
      toast.success('Profile photo removed.');
    }
  }

  render() {
    const {
      match,
      user,
      currentUser,
      dispatch,
      profilePhotoLoader,
    } = this.props;
    const { params } = match;
    return (
      <EditAccountSection>
        <EditAccountMainContainer role="main">
          <div />
          <ContentAreaDiv>
            <DrawerList>
              {drawerListIems.map(({ text, path }) => (
                <ListItem key={text}>
                  <NavLink
                    to={path}
                    activeClassName="link_is_active"
                    css={ListItemTextLink}
                  >
                    {text}
                  </NavLink>
                </ListItem>
              ))}
            </DrawerList>
            <DrawerListActionArea>
              {params[0] === 'edit' && !_.isEmpty(currentUser) && (
                <RenderEditForm
                  user={user}
                  currentUser={currentUser}
                  dispatch={dispatch}
                  profilePhotoLoader={profilePhotoLoader}
                />
              )}
            </DrawerListActionArea>
          </ContentAreaDiv>
        </EditAccountMainContainer>
      </EditAccountSection>
    );
  }
}

export default EditProfile;
