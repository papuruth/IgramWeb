import { connect } from 'react-redux';
import Message from '@/components/DirectMessage/Message';

const mapStateToProps = (state) => {
  const { renderNewMsg, isMsgDeleted } = state.chatReducer;
  return {
    renderNewMsg,
    isMsgDeleted: isMsgDeleted || false,
  };
};

export default connect(mapStateToProps)(Message);
