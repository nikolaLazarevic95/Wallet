export default {
  setUser(state, payload) {
    // i za login i signup
    state.userId = payload.userId;
    state.sid = payload.sid;
    state.userName = payload.userName;
    state.userEmail = payload.userEmail;
    state.didAutoLogout = false; //reset autoLogout, da bi kada bude true sledeci put aktivirali watcher iz App.vue
    state.accCreationDate= payload.accCreationDate
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },

  updateUser(state, payload) {
    (state.userName = payload.userName),
    (state.pictureUrlPreview = payload.pictureUrlPreview);
  },
};
