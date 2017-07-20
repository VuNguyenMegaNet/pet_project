import Vue from 'vue';

export const login = ({ commit }, { username, password }) => {
	Vue.prototype.$http.post('/login', { username, password })
		.then((data) => {
			commit('IS_AUTHENTICATED', true);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const logout = ({ commit }) => {
	Vue.prototype.$http.get('/logout')
		.then(() => {
			commit('IS_AUTHENTICATED', false);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const listenToProductList = ({ commit }) => {
	Vue.prototype.$http.get('products.json')
		.then(data => {
			if (data.data) {
				commit('UPDATE_PRODUCT_LIST', data.data);
			}
		});
};

export const updateCart = ({ commit }, order) => {
	commit('UPDATE_CART', order);
	if (order.isAdd) {
		const messageObj = {
			message: `Add ${order.item.title} to cart successfully`,
			messageClass: 'success',
			autoClose: true
		};
		commit('ADD_MESSAGE', messageObj);
	}
};

export const removeItemInCart = ({ commit }, order) => {
	commit('REMOVE_CART_ITEM', order);
};
