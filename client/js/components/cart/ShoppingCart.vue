<template>
	<div class="container">
		<table id="cart" class="table table-hover table-condensed">
			<thead>
				<tr>
					<th style="width:50%">Product</th>
					<th style="width:10%">Price</th>
					<th style="width:8%">Quantity</th>
					<th style="width:22%" class="text-center">Subtotal</th>
					<th style="width:10%"></th>
				</tr>
			</thead>

			<transition-group name="list-shopping-cart" tag="tbody">
				<app-cart-item v-for="cartItem in cartItemList" :cartItem="cartItem" :key="cartItem.id"></app-cart-item>
			</transition-group>

			<tfoot>
				<tr class="visible-xs">
					<td class="text-center"><strong>Total {{ totalValue | currency }}</strong></td>
				</tr>
				<tr>
					<td>
						<button class="btn btn-warning">
							<i class="fa fa-angle-left"></i> Save and Continue Shopping
						</button>
					</td>
					<td class="hidden-xs" colspan="2"></td>
					<td class="hidden-xs text-center"><strong>Total {{ totalValue | currency }}</strong></td>
					<td>
						<button class="btn btn-success btn-block">
							Checkout <i class="fa fa-angle-right"></i>
						</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
	import CartItem from './CartItem';
	export default {
		computed: {
			cartItemList() {
				if (this.$store.getters.cartItemList.length <= 0) {
					window.location.href = '/';
				} else {
					return this.$store.getters.cartItemList;
				}
			},
			totalValue() {
				return this.$store.getters.cartValue;
			}
		},
		components: {
			appCartItem: CartItem
		}
	};

</script>

<style scoped>
	.list-shopping-cart-leave-active {
		transition: all 0.4s;
	}

	.list-shopping-cart-leave-to {
		opacity: 0;
		transform: translateX(50px);
	}
</style>