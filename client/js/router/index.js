import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = (resolve) => {
	require(['./../components/Home'], resolve);
};

const Portfolio = (resolve) => {
	require(['./../components/portfolio/Portfolio'], resolve);
};

const Stocks = (resolve) => {
	require(['./../components/stocks/Stocks'], resolve);
};

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home,
			beforeEnter: (to, from, next) => {
				next();
			}
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

