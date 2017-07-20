const state = {
	isAuthenticated: false
};

const mutations = {
	'IS_AUTHENTICATED'(state, boolean) {
		if (boolean) {
			state.isAuthenticated = true;
		} else {
			state.isAuthenticated = false;
		}
	}
};

const actions = {
	isAuthenticated({ commit }, boolean) {
		commit('IS_AUTHENTICATED', boolean);
	}
};

const getters = {
	isAuthenticated: (state) => {
		return state.isAuthenticated;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
