import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../stores/store';

const Store = (resolve) => {
	require(['./../components/Store'], resolve);
};

const ShoppingCart = (resolve) => {
	require(['./../components/cart/ShoppingCart'], resolve);
};

const ProductDetails = (resolve) => {
	require(['./../components/product/ProducDetails'], resolve);
};

const Login = (resolve) => {
	require(['./../components/auth/Login'], resolve);
};

const Register = (resolve) => {
	require(['./../components/auth/Register'], resolve);
};

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Store,
			name: 'mainpage'
		},
		{
			path: '/product/:id',
			component: ProductDetails,
			name: 'product'
		},
		{
			path: '/cart',
			component: ShoppingCart,
			name: 'shoppingcart',
			beforeEnter: (to, from, next) => {
				if (store.getters.cartItemList.length <= 0) {
					next(false);
				} else {
					next();
				}
			}
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register,
			name: 'register'
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});

router.beforeEach((to, from, next) => {
	const now = Date.now();
	const authUser = JSON.parse(window.localStorage.getItem('currentUser'));
	let exprireTime = window.localStorage.getItem('current_expiresTime');
	if (exprireTime === undefined || exprireTime === null) { exprireTime = 0; }

	if (to.path !== '/login') {
		if (authUser) {
			if (exprireTime < now) {
				window.localStorage.clear();
				next('/login');
			} else {
				store.commit('IS_AUTHENTICATED', true);
				next();
			}
		} else {
			Vue.prototype.$http.get('/currentUser')
				.then((data) => {
					store.commit('IS_AUTHENTICATED', true);
					window.localStorage.setItem('currentUser', JSON.stringify(data.data.currentUser));
					window.localStorage.setItem('current_expiresTime', Date.now() + (24 * 60 * 60) * 1000);
					next();
				})
				.catch(() => {
					next('/login');
				});
		}
	} else {
		if (authUser) {
			if (exprireTime < now) {
				window.localStorage.clear();
				next();
			} else {
				store.commit('IS_AUTHENTICATED', true);
				next('/');
			}
		} else {
			return next();
		}
	}
});

export default router;
