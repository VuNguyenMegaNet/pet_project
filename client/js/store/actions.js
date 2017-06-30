import Vue from 'vue';
const http = Vue.prototype.$http;

export const loadData = ({ commit }) => {
	http.get('data.json')
		.then(data => {
			const getdata = data.data;
			if (getdata) {
				const stocks = getdata.stocks;
				const funds = getdata.funds;
				const stockPortfolio = getdata.stockPortfolio;

				const portfolio = {
					stockPortfolio,
					funds
				};

				commit('SET_STOCKS', stocks);
				commit('SET_PORTFOLIO', portfolio);
			}
		});
};
