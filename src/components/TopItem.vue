<template>
	<div class="top-item">
		<div class="top-item__order">
			{{ order }}
		</div>
		<div class="top-item__content">
			<img :src="image" alt="" />
			<h2 class="top-item__artist">
				{{ top.name }}
			</h2>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		top: {
			type: Object,
			default() {
				return {};
			},
		},
		order: {
			type: Number,
			default: 1,
		},
	},

	data() {
		return {};
	},
	methods: {},
	computed: {
		image() {
			if (this.top.images) {
				return this.top.images[1].url;
			}
			return this.top.album.images[1].url;
		},
	},
};
</script>

<style lang="scss" scoped>
.top-item::v-deep {
	display: flex;
	justify-content: center;
	align-items: center;

	.top-item__order {
		font-size: 35rem;
		color: #1db954;
	}
}
</style>
