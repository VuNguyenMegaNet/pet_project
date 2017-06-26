import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './../components/Home';
import Portfolio from './../components/portfolio/Portfolio';
import Stocks from './../components/stocks/Stocks';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/portfolio',
			component: Portfolio
		},
		{
			path: '/stocks',
			component: Stocks
		}
	]
});

