const state = {
	cartItemList: []
};

const mutations = {
	'UPDATE_CART'(state, { item, quantity, isAdd }) {
		const record = state.cartItemList.find(element => element.id == item.id);
		if (record) {
			if (isAdd) {
				record.quantity += quantity;
			} else {
				record.quantity = quantity;
			}
		} else {
			state.cartItemList.push({
				...item,
				quantity
			});
		}
	},
	'REMOVE_CART_ITEM'(state, order) {
		const record = state.cartItemList.find(element => element.id == order.id);
		state.cartItemList.splice(state.cartItemList.indexOf(record), 1);
	}
};

const actions = {};

const getters = {
	cartItemList: (state) => {
		return state.cartItemList;
	},
	cartValue: (state) => {
		let res = 0;
		state.cartItemList.map((item, idx) => {
			res += item.quantity * item.price;
		});
		return res;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
