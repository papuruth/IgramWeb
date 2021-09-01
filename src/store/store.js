import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { sessionService } from 'redux-react-session';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import history from '@/routes/history';
import { rootReducer } from '../redux/rootReducer';
import sagas from '../redux/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  sagaMiddleware,
  thunkMiddleware,
  routerMiddleware(history),
];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['timelineReducer', 'userFeedReducer', 'userReducer', 'loaderReducer'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);

const validateSession = () => true;

const options = {
  refreshOnCheckAuth: true,
  redirectPath: '/home',
  validateSession,
};

sagaMiddleware.run(sagas);
sessionService.initSessionService(store, options);

export { store, persistor };
