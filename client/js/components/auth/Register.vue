<template>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
			<form action="" role="form" id="register-form">
				<h3 class="text-center">Register</h3>
				<div class="form-group">
					<label for="username">Username:</label>
					<input type="text" name="username" id="username" class="form-control" placeholder="Username" v-model="username">
					<p class="text-danger" v-if="username == ''">* Username is required</p>
				</div>
				<div class="form-group">
					<label for="password">Password:</label>
					<input type="password" name="password" id="password" class="form-control" placeholder="Password" v-model="password">
					<p class="text-danger" v-if="password == ''">* Password is required</p>
					<p class="text-danger" v-if="password && password.length < 6">* Password is not allow less than 6 characters</p>
					<p class="text-danger" v-if="password !== '' && password !== passwordConfirm">* Password and Password confirm is not match</p>
				</div>
				<div class="form-group">
					<label for="password-confirm">Password Confirm:</label>
					<input type="password" name="password-confirm" id="password-confirm" class="form-control" placeholder="Password Confirm"
					 v-model="passwordConfirm">
					<p class="text-danger" v-if="passwordConfirm == ''">* Password confirm is required</p>
					<p class="text-danger" v-if="passwordConfirm !== '' && password !== passwordConfirm">* Password and Password confirm is not match</p>
				</div>
				<div class="form-group">
					<label>Gender:</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" name="gender" id="optionsGender1" value="male" checked v-model="gender">
						<i class="fa fa-male" aria-hidden="true"></i>
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" name="gender" id="optionsGender2" value="female" v-model="gender">
						<i class="fa fa-female" aria-hidden="true"></i>
					</label>
				</div>
				<div class="form-group">
					<label for="email">Email:</label>
					<input type="text" name="email" id="email" class="form-control" placeholder="Email" v-model="email">
					<p class="text-danger" v-if="email == ''">* Email is required</p>
					<p class="text-danger" v-if="email !== '' && !regEmail.test(email)">* Email is wrong</p>
				</div>
				<div class="form-group">
					<label for="address">Address:</label>
					<input type="text" name="address" id="address" class="form-control" placeholder="Address" v-model="address">
					<p class="text-danger" v-if="address == ''">* Address is required</p>
				</div>
				<div class="form-group">
					<button class="btn btn-success" style="width: 100%" @click.prevent="registerByEmailLocal" :disabled="!listenError">Register</button>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-lg-12">
							<div class="text-center">
								<router-link to="/login"><a href="">Login</a></router-link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				regEmail: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
				username: '',
				password: '',
				passwordConfirm: '',
				gender: 'male',
				email: '',
				address: ''
			};
		},
		computed: {
			listenError() {
				if (!this.username || !this.password || !this.passwordConfirm || !this.gender || !this.email || !this.address || (this.password !== this.passwordConfirm) || (!this.regEmail.test(this.email)) || (this.password && this.password.length < 6)) {
					return false;
				} else {
					return true;
				}
			}
		},
		methods: {
			registerByEmailLocal() {
				const info = {
					username: this.username,
					password: this.password,
					passwordConfirm: this.passwordConfirm,
					gender: this.gender,
					email: this.email,
					address: this.address
				};
				console.log(info);
			}
		}
	};

</script>

<style scoped>
	.border-error {
		border: 1px solid #a94442;
	}
</style>