import mutations from './mutations';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      sid: null,
      userName: null,
      userEmail: null,
      didAutoLogout: false,
      pictureUrlPreview:null,
      accCreationDate:null,

    };
  },
  mutations,
  actions,
  getters,
};
