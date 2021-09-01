import { connect } from 'react-redux';
import Title from '@/components/DirectMessage/Title';

const mapStateToProps = (state) => {
  const {
    isMuted,
    newChatData,
    isUserBlocked,
    isChatDeleted,
  } = state.chatReducer;
  return {
    isMuted,
    newChatData: newChatData || {},
    isUserBlocked,
    isChatDeleted,
  };
};

export default connect(mapStateToProps)(Title);
