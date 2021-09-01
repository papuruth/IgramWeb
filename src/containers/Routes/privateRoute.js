import { connect } from 'react-redux';
import PrivateRoute from '@/utils/privateRoute';

const mapStateToProps = ({ session }) => {
  const { authenticated, user } = session;
  return {
    authenticated,
    user,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
