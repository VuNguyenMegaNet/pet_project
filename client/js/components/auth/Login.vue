<template>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
			<form action="" id="login-form" role="form" style="display: block">
				<h3 class="text-center">Login</h3>
				<div class="form-group">
					<input type="text" name="username" id="username" class="form-control" placeholder="Username" v-model="username">
				</div>
				<div class="form-group">
					<input type="password" name="password" id="password" class="form-control" placeholder="Password" v-model="password">
				</div>

				<div class="form-group">
					<button class="btn btn-success" style="width: 100%" @click.prevent="loginLocal">Log in</button>
				</div>
				<div style="display: none">{{ isLogin }}</div>
				<div class="form-group">
					<div class="row">
						<div class="col-lg-12">
							<div class="text-center">
								<router-link to="/register"><a href="">Register</a></router-link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				username: '',
				password: ''
			};
		},
		computed: {
			isLogin() {
				if (this.$store.getters.isAuthenticated) {
					return this.$router.push({ path: '/' });
				}
			}
		},
		methods: {
			...mapActions(['login']),
			loginLocal() {
				const credentials = {
					username: this.username,
					password: this.password
				};
				this.login(credentials);
			}
		}
	};

</script>