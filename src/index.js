import App from '@/containers/App';
import * as serviceWorker from '@/serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'popper.js/dist/popper';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import GlobalStyled from './styles/global';

window.$ = $;
window.jquery = $;

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 83 && event.ctrlKey) {
    event.preventDefault();
    return false;
  }
  return false;
});

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyled />
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
