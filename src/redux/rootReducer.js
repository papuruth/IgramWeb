import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { sessionReducer } from 'redux-react-session';
import { userReducer, userFeedReducer } from './user/userReducer';
import chatReducer from './chats/chatsReducer';
import timelineReducer from './timeline/timelineReducer';
import loaderReducer from './Loader/loaderReducer';

export const rootReducer = (history) => {
  const appReducer = combineReducers({
    router: connectRouter(history),
    session: sessionReducer,
    userReducer,
    chatReducer,
    userFeedReducer,
    timelineReducer,
    loaderReducer,
  });
  return (state, action) => appReducer(state, action);
};
