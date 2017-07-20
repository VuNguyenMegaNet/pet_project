<template>
	<nav class="navbar navbar-inverse" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<router-link to="/" class="navbar-brand">Online Store</router-link>
			</div>

			<ul class="nav navbar-nav navbar-right">
				<router-link to="/login" tag="li"><a>Login</a></router-link>
				<li class="li-pointer" @click.prevent="logoutLocal"><a>Logout</a></li>
				<router-link to="/register" tag="li"><a>Register</a></router-link>
				<li>
					<router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
						Checkout <span class="badge">{{ numItems }} ({{ cartValueLocal | currency }})</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div style="display: none">{{ isLogout }}</div>
	</nav>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		computed: {
			numItems() {
				let res = 0;
				this.$store.getters.cartItemList.map((item, idx) => {
					res += item.quantity;
				});
				return res;
			},
			cartValueLocal() {
				return this.$store.getters.cartValue;
			},
			isLogout() {
				if (!this.$store.getters.isAuthenticated) {
					return this.$router.push({ path: '/login' });
				}
			}
		},
		methods: {
			...mapActions(['logout']),
			logoutLocal() {
				this.logout();
				window.localStorage.clear();
			}
		}
	};

</script>

<style scoped>
	.navbar-btn a {
		color: white;
	}

	.li-pointer {
		cursor: pointer;
	}

	.li-pointer:hover {
		cursor: pointer;
	}
</style>