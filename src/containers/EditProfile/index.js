import { connect } from 'react-redux';
import EditProfile from '@/components/EditProfile';

const mapStateToProps = (state) => {
  const { user } = state.session;
  const { profilePhotoLoader } = state.loaderReducer;
  const {
    currentUser,
    profileUpdateSuccess,
    profilePhotoUpdated,
    profilePhotoRemoved,
  } = state.userReducer;

  return {
    user,
    currentUser,
    profilePhotoLoader,
    profileUpdateSuccess,
    profilePhotoUpdated,
    profilePhotoRemoved,
  };
};

export default connect(mapStateToProps)(EditProfile);
