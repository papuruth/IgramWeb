/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  timelineAction,
  fetchUserReelAction,
  fetchSuggestedUserAction,
} from '@/redux/timeline/timelineAction';
import Timeline from '../Timeline';
import { StyledContainer } from './styles';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { dispatch, user } = props;
    const { username } = user;
    dispatch(timelineAction(username));
    dispatch(fetchUserReelAction(username));
    dispatch(fetchSuggestedUserAction(user.pk, username));
  }

  render() {
    const {
      timelines,
      dispatch,
      hasMore,
      user,
      greetingsFlag,
      userReels,
      suggestedUser,
      history
    } = this.props;
    return (
      <StyledContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Igram</title>
        </Helmet>
        <Timeline
          data={timelines}
          dispatch={dispatch}
          hasMore={hasMore}
          user={user}
          history={history}
          userReels={userReels}
          suggestedUser={suggestedUser}
          greetingsFlag={greetingsFlag}
        />
      </StyledContainer>
    );
  }
}
