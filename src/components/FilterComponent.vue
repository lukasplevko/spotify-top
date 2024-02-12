<template>
	<div class="filter-top">
		<a
			href="#"
			class="filter-link"
			:class="{ 'is-active': filterItem == 'artists' }"
			@click.prevent="filterTop('artists')"
			>Artists</a
		>
		<a
			href="#"
			class="filter-link"
			:class="{ 'is-active': filterItem == 'tracks' }"
			@click.prevent="filterTop('tracks')"
			>Tracks</a
		>
	</div>
</template>

<script>
export default {
	props: {
		filterItem: {
			type: String,
			default: "artists",
		},
	},
	data() {
		return {};
	},
	methods: {
		filterTop(active_filter) {
			this.$emit("fetch-top", active_filter);
		},
	},
};
</script>

<style lang="scss" scoped>
.filter-top::v-deep {
	display: flex;
	gap: 1rem;
	justify-content: center;
	font-size: 3rem;

	.filter-link {
		text-decoration: none;
		color: #b3b3b3;
	}

	.is-active {
		text-decoration: underline;
		color: #1db954;
		font-weight: bold;
	}
}
</style>
