<template>
	<tr>
		<td data-th="Product">
			<div class="row">
				<div class="col-sm-2 hidden-xs">
					<img :src="cartItem.thumbnail_url" alt="..." class="img-responsive">
				</div>
				<div class="col-sm-10">
					<h4 class="nomargin">{{ cartItem.title }}</h4>
					<p>{{ cartItem.description }}</p>
				</div>
			</div>
		</td>
		<td data-th="Price">{{ cartItem.price | currency }}</td>
		<td data-th="Quantity">
			<input type="number" class="form-control text-center" min="0" :value="cartItem.quantity" @input="updateQuantity">
		</td>
		<td data-th="Subtotal" class="text-center">{{ subtotal | currency }}</td>
		<td class="actions" data-th="">
			<button class="btn btn-danger btn-sm" @click="removeItem"><i class="fa fa-trash-o"></i></button>
		</td>
	</tr>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		props: ['cartItem'],
		computed: {
			subtotal() {
				return this.cartItem.price * this.cartItem.quantity;
			}
		},
		methods: {
			...mapActions(['updateCart', 'removeItemInCart']),
			updateQuantity(event) {
				if (event.target.value <= 0) { event.target.value = 1; }
				const order = {
					item: this.cartItem,
					quantity: parseInt(event.target.value),
					isAdd: false
				};
				this.updateCart(order);
			},
			removeItem() {
				this.removeItemInCart(this.cartItem);
			}
		}
	};

</script>