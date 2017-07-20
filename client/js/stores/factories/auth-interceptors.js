import Vue from 'vue';
import store from './../store';

const interceptor = () => {
	Vue.prototype.$http.interceptors.response.use((response) => {
		return response;
	}, (err) => {
		const responseError = err.response;
		switch (responseError.status) {
		case 401:
			break;
		case 403:
			store.dispatch('isAuthenticated', false);
			break;
		}
		return Promise.reject(err);
	});
};

export default interceptor;
