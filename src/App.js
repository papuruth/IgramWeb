import Header from '@/containers/Header';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import CloseIcon from '@/assets/images/close.png';
import routes from './routes';
import history from './routes/history';
import ErrorBoundary from './utils/errorBoundary';
import { fullUserInfoAction } from './redux/user/userAction';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  closeModalViewer = (event) => {
    event.preventDefault();
    const {dispatch, user} = this.props;
    const viewer = document.querySelector('.viewer');
    if (viewer) {
      viewer.classList.remove('active');
    }
    dispatch(fullUserInfoAction(user.pk, user.pk));
  };

  render() {
    const { authenticated, primaryLoader } = this.props;
    return (
      <div>
        <ConnectedRouter history={history}>
          <ErrorBoundary>
            {authenticated && <Header />}
            <Switch>{routes.map((route) => route)}</Switch>
            {primaryLoader ? (
              <div id="preloader">
                <div id="loader" />
              </div>
            ) : null}
          </ErrorBoundary>
        </ConnectedRouter>
        <ToastContainer
          autoClose={8000}
          closeButton={false}
          pauseOnHover
          position="bottom-right"
        />
        <div className="viewer">
          <button
            className="close"
            onKeyPress={this.closeModalViewer}
            onClick={this.closeModalViewer}
            type="submit">
            <img width="25px" src={CloseIcon} alt="close icon" />
          </button>
          <div className="viewer_content" />
        </div>
      </div>
    );
  }
}

export default App;
