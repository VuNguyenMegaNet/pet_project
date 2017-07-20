require('assets/styles/main.less');
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/store';
import axios from 'axios';
import authInterceptor from './stores/factories/auth-interceptors';

const http = axios.create({
	// baseURL: 'https://vuejs-shopping-cart.firebaseio.com/'
	baseURL: 'http://localhost:3000/'
});

Vue.prototype.$http = http;
Vue.prototype.$http.defaults.withCredentials = true;
authInterceptor();

Vue.filter('currency', (value) => {
	return `$ ${value.toLocaleString()}`;
});

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

