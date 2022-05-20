import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      searched: {},
    };
  },
  mutations: {
    updateSearchedKeyWord(state, options) {
      const { keyword, page, movieList } = options;
      if (!state.searched[keyword]) {
        state.searched[keyword] = {
          page: 1,
          movieList: null,
        };
      }
      state.searched[keyword] = {
        page,
        movieList: [...movieList],
      };
    },
  },
  actions: {
    saveSearchedKeyWord({ commit }, options) {
      commit('updateSearchedKeyWord', { ...options });
    },
  },
});
