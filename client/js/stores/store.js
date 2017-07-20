import Vue from 'vue';
import Vuex from 'vuex';

import products from './modules/products';
import cart from './modules/cart';
import messages from './modules/messages';
import auth from './modules/auth';

import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	modules: {
		products,
		cart,
		messages,
		auth
	}
});
