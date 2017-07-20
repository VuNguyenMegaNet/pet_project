const state = {
	messageGroup: {
		messageClass: '',
		message: '',
		timeoutEvent: null
	}
};

const mutations = {
	'ADD_MESSAGE'(state, { message, messageClass, autoClass }) {
		state.messageGroup = {
			messageClass,
			message
		};

		if (state.timeoutEvent) {
			clearTimeout(state.timeoutEvent);
		}
		state.timeoutEvent = setTimeout(() => {
			state.messageGroup = {
				messageClass: '',
				message: ''
			};
		}, 3000);
	},
	'CLEAR_MESSAGE'(state) {
		state.messageGroup = {
			messageClass: '',
			message: ''
		};
	}
};

const actions = {
	clearMessage({ commit }) {
		commit('CLEAR_MESSAGE');
	}
};

const getters = {
	messages: (state) => {
		return state.messageGroup;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
