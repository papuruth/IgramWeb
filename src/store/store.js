import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { sessionService } from 'redux-react-session';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import history from '@/routes/history';
import rootReducer from '../redux/rootReducer';
import sagas from '../redux/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunkMiddleware, routerMiddleware(history)];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['timelineReducer', 'userFeedReducer', 'userReducer', 'loaderReducer'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

const validateSession = () => true;

const options = {
  refreshOnCheckAuth: false,
  redirectPath: '/',
  driver: 'LOCALSTORAGE',
  validateSession,
};

sagaMiddleware.run(sagas);
store.close = () => store.dispatch(END);
sessionService.initSessionService(store, options);
sessionService.refreshFromLocalStorage();

export { store, persistor };
