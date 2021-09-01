import { connect } from 'react-redux';
import PublicRoute from '@/utils/publicRoute';

const mapStateToProps = ({ session }) => {
  const { authenticated, user } = session;
  return {
    authenticated,
    user,
  };
};

export default connect(mapStateToProps)(PublicRoute);
