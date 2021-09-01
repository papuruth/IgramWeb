import { loaderConstants } from './loaderConstants';

const initialState = {
  profilePhotoLoader: false,
  pendingRequestLoader: false,
  primaryLoader: false,
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case loaderConstants.SHOW_LOADER_SUCCESS:
      return {
        ...state,
        [action.payload.type]: action.payload.flag,
      };
    case loaderConstants.PRIMARY_LOADER_START_SUCCESS:
      return {
        ...state,
        primaryLoader: action.payload,
      };
    case loaderConstants.PRIMARY_LOADER_STOP_SUCCESS:
      return {
        ...state,
        primaryLoader: action.payload,
      };
    default:
      return state;
  }
}
