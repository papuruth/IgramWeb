import React from 'react';
import { userAuthHandleCheckpoint, userAuthRequest, userAuthStartCheckpoint, userAuthVerifyOtp } from '@/redux/user/userAction';
import Toast from '@/utils/toast';
import { StyledContainer } from './styles';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      errorType: '',
      errorPayload: '',
      clearLoginError: false,
      otp: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errorType !== state.errorType) {
      return {
        errorType: props.errorType,
        errorPayload: props.errorPayload,
        clearLoginError: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { logoutStatus } = this.props;
    if (logoutStatus && Object.keys(logoutStatus).length) {
      Toast.info(`Hello, ${logoutStatus.user}! You have been logged out.`);
      Toast.warning('Session Deleted Successfully!!!');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { errorType, dispatch, isCheckpoint } = this.props;
    if (errorType !== prevState.errorType) {
      const button = document.querySelector('button[type=submit]');
      button.innerText = errorType === 'isTwoFactorError' || errorType === 'isCheckpointError' ? 'Verify' : 'Login to Instagram';
      button.classList.remove('loggingIn');
      button.removeAttribute('disabled');
    }
    if (errorType === 'isCheckpointError' && !isCheckpoint) {
      dispatch(userAuthStartCheckpoint());
    }
  }

  handleUserInput = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  login = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userAuthRequest(username, password));
      const button = document.querySelector('button[type=submit]');
      button.innerText = 'Logging In...';
      button.classList.add('loggingIn');
      button.setAttribute('disabled', 'true');
      this.setState({
        error: false,
        clearLoginError: true,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  verifyOtp = (event) => {
    event.preventDefault();
    const { otp, errorPayload } = this.state;
    const otpDetails = { ...errorPayload, otp };
    const { dispatch } = this.props;
    dispatch(userAuthVerifyOtp(otpDetails));
    const button = document.querySelector('button[type=submit]');
    button.innerText = 'Verifying OTP...';
    button.classList.add('loggingIn');
    button.setAttribute('disabled', 'true');
  };

  handleCheckpoint = (event) => {
    event.preventDefault();
    const { otp } = this.state;
    const { dispatch } = this.props;
    dispatch(userAuthHandleCheckpoint(otp));
    const button = document.querySelector('button[type=submit]');
    button.innerText = 'Verifying OTP...';
    button.classList.add('loggingIn');
    button.setAttribute('disabled', 'true');
  };

  fbLogin = () => {
    window.location.href = 'http://localhost:3001/facebook';
  };

  handleResponse = () => {};

  handleError = (error) => {
    this.setState({ error });
  };

  render() {
    const { username, password, error, errorType, otp, errorPayload, clearLoginError } = this.state;
    return (
      <StyledContainer>
        <div className="container">
          {errorType !== 'isTwoFactorError' && errorType !== 'isCheckpointError' && (
            <form className="pageCard mx-auto p-4 p-sm-5" onSubmit={this.login}>
              <div className="clearfix welcomeBox">
                <img className="brand d-block float-none mx-auto" src="img/icon.png" alt="" width="64px" />
                <h2 className="text-center title">Welcome</h2>
                <span className="d-block text-center">Login with your Instagram credentials</span>
              </div>
              <div className="input-group loginInputs mt-4">
                <label htmlFor="username">
                  <input
                    className="form-control username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleUserInput}
                    placeholder="Username"
                  />
                </label>
                <label htmlFor="password">
                  <input
                    className="form-control password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleUserInput}
                    placeholder="Password"
                  />
                </label>
              </div>
              <button className="loginButton mt-3 btn btn-primary" type="submit">
                Login to Instagram
              </button>
              {errorType === 'loginError' && !clearLoginError ? <span className="d-block errorMessage text-center mt-3">{errorPayload}</span> : null}
              <div className="disclaimer mt-5 text-center">
                {error && <p style={{ color: 'red' }}>All fields are required.</p>}
                <p>
                  This app is not affiliated with Instagram. You can visit the open source project
                  {' '}
                  <a href="https://github.com/papuruth/igdm-react-web" target="_blank" rel="noopener noreferrer">
                    here.
                  </a>
                </p>
                <p>We don&apos;t store your password.</p>
              </div>
            </form>
          )}
          {errorType === 'isTwoFactorError' && (
            <form className="pageCard mx-auto p-4 p-sm-5" onSubmit={this.verifyOtp}>
              <div className="disclaimer text-center">
                <p>TwoFactor Authentication Enabled</p>
                <p>Please enter OPT received on phone.</p>
              </div>
              <div className="clearfix welcomeBox">
                <img className="brand d-block float-none mx-auto" src="img/icon.png" alt="" width="64px" />
              </div>
              <div className="input-group loginInputs mt-4">
                <label htmlFor="otp">
                  <input className="form-control otp" type="text" name="otp" value={otp} onChange={this.handleUserInput} placeholder="OTP" />
                </label>
              </div>
              <button className="loginButton mt-3 btn btn-primary" type="submit" disabled={!otp}>
                Verify
              </button>
              <span className="d-block errorMessage text-center mt-3" id="error" />
            </form>
          )}
          {errorType === 'isCheckpointError' && (
            <div className="container cardBox pb-5 pt-3 pt-sm-5">
              <form className="pageCard mx-auto p-4 p-sm-5" onSubmit={this.handleCheckpoint}>
                <div className="clearfix welcomeBox">
                  <p className="d-block text-center">Checkpoint Verification Required</p>
                  <p className="d-block text-center">Please enter OPT received on phone.</p>
                </div>
                <div className="input-group loginInputs mt-4">
                  <label htmlFor="otp">
                    <input
                      className="form-control code"
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={this.handleUserInput}
                      required
                      placeholder="OTP"
                    />
                  </label>
                </div>
                <button className="loginButton mt-3 btn btn-primary" type="submit" disabled={!otp}>
                  Verify
                </button>
                <span className="d-block errorMessage text-center mt-3" id="error" />
              </form>
            </div>
          )}
        </div>
      </StyledContainer>
    );
  }
}
