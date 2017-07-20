<template>
	<div>
		<app-header></app-header>
		<message-component></message-component>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<transition name="slide" mode="out-in">
						<router-view></router-view>
					</transition>

					<!--<div class="panel panel-warning" id="reset-store-panel">
						<div class="panel-heading">Admin Panel (Testing purpose)</div>
						<div class="panel-body text-center">
							<button class="btn btn-warning">Reset Store</button>
						</div>
					</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Header from './components/Header';
	import MessageComponent from './components/common/messageComponent';
	export default {
		components: {
			appHeader: Header,
			messageComponent: MessageComponent
		},
		methods: {
			...mapActions([
				'listenToProductList'
			])
		},
		created() {
			// this.listenToProductList();
		}
	};

</script>

<style>
	#reset-store-panel {
		position: fixed;
		bottom: 0px;
		right: 0px;
	}

	.margin-left-sm {
		margin-left: 10px;
	}

	html,
	body {
		height: 100%;
	}

	.wrapper {
		min-height: 100%;
		margin-bottom: -50px;
		padding-bottom: 50px;
	}

	footer {
		height: 50px;
		color: #666;
		padding: 10px 0 10px 0;
		font-size: 85%;
	}

	footer a {
		color: #999;
	}

	footer a:hover {
		color: #efefef;
	}

	.inline-block {
		display: inline-block;
	}

	.slide-enter-active {
		animation: slide-in 200ms ease-out forwards;
	}

	.slide-leave-active {
		animation: slide-out 200ms ease-out forwards;
	}

	@keyframes slide-in {
		from {
			transform: translateY(-30px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slide-out {
		from {
			transform: translateY(0);
			opacity: 1;
		}
		to {
			transform: translateY(-30px);
			opacity: 0;
		}
	}
</style>