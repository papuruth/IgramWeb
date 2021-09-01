const prefix = '@igramweb:';

const storageKeys = {
  token: `${prefix}token`,
  username: `${prefix}username`,
};

export default {
  // Token
  setToken: (token) => localStorage.setItem(storageKeys.token, token),
  getToken: () => localStorage.getItem(storageKeys.token),

  // Username
  setUsername: (username) =>
    localStorage.setItem(storageKeys.username, username),
  getUsername: () => localStorage.getItem(storageKeys.username),

  // Clear Storage
  clearAllStorage: () => {
    localStorage.clear();
    sessionStorage.clear();
  },
};
