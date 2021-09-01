import { loaderConstants } from './loaderConstants';

export const loaderStartAction = () => ({
  type: loaderConstants.PRIMARY_LOADER_START_REQUEST,
});

export const loaderStopAction = () => ({
  type: loaderConstants.PRIMARY_LOADER_STOP_REQUEST,
});

export const loaderAction = (flag, type) => ({
  type: loaderConstants.SHOW_LOADER_REQUEST,
  payload: {
    type,
    flag,
  },
});
