<template>
	<div class="user-card">
		<img :src="profile.images[1].url" alt="" class="user-card__image" />
		<div class="user-card__info">
			<div class="user-card__name">
				{{ profile.display_name }}
			</div>
			<div class="user-card__followers">
				Followers:
				<span class="user-card__followers-number">{{
					profile.followers.total
				}}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		profile: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	mounted() {
		console.log("Profile", this.profile);
	},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.user-card::v-deep {
	font-size: 2rem;
	font-weight: bolder;
	text-align: center;
	margin-bottom: 2rem;
	.user-card__image {
		border-radius: 50%;
	}

	.user-card__info {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
}
</style>
