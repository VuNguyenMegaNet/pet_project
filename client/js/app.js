require('assets/styles/main.less');
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from 'axios';

const http = axios.create({
	baseURL: 'https://http-vuejs-13b28.firebaseio.com/'
});

Vue.prototype.$http = http;

Vue.filter('currency', (value) => {
	return `$ ${value.toLocaleString()}`;
});

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

