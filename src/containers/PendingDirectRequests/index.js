import { connect } from 'react-redux';
import PendingDirectRequests from '@/components/DirectPendingRequests';

const mapStateToProps = (state) => {
  const { pendingInboxRecords } = state.chatReducer;
  const { user } = state.session;
  const { pendingRequestLoader } = state.loaderReducer;
  return {
    pendingInboxRecords: pendingInboxRecords || [],
    pendingRequestLoader,
    user,
  };
};

export default connect(mapStateToProps)(PendingDirectRequests);
