<template>
	<h1>Your Funds: {{ funds | currency }}</h1>
</template>

<script>
	export default {
		computed: {
			funds() {
				return this.$store.getters.funds;
			}
		}
	};

</script>