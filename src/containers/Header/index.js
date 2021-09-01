import { connect } from 'react-redux';
import Header from '@/components/Header';

const mapStateToProps = (state) => {
  const { authenticated, user } = state.session;
  const { searchUserResult, searchUserLoader, directInboxRecords } = state.chatReducer;
  return {
    authenticated,
    user,
    directInboxRecords: directInboxRecords || [],
    searchUserLoader: searchUserLoader || false,
    searchUserResult: searchUserResult || [],
  };
};

export default connect(mapStateToProps)(Header);
