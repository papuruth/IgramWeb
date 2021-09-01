import { connect } from 'react-redux';
import App from '@/App';

const mapStateToProps = (state) => {
  const { authenticated, user } = state.session;
  const { primaryLoader } = state.loaderReducer;
  return {
    authenticated,
    user,
    primaryLoader,
  };
};

export default connect(mapStateToProps)(App);
