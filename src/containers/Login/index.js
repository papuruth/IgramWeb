import { connect } from 'react-redux';
import Login from '@/components/Login';

const mapStateToProps = (state) => {
  const {
    errorPayload, errorType, logoutStatus, isCheckpoint,
  } = state.userReducer;
  return {
    errorPayload,
    errorType,
    logoutStatus,
    isCheckpoint,
  };
};

const connectedLogin = connect(mapStateToProps)(Login);

export default connectedLogin;
