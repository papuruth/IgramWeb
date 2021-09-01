import { connect } from 'react-redux';
import RenderStories from '@/components/Timeline/renderStories';

const mapStateToProps = (state) => {
  const { userStoriesItems } = state.timelineReducer;
  const { user } = state.session;

  return {
    userStoriesItems,
    userPk: user.pk,
  };
};

export default connect(mapStateToProps)(RenderStories);
