<template>
	<div>
		<transition>
			<UserCardComponent v-if="!loaders.get_user" :profile="user_profile" />
		</transition>

		<FilterComponent :filterItem="active_filter" @fetchTop="fetchTop" />
		<h1 class="users-top" v-if="!loaders.get_user" data-aos="fade-in">
			Users top <span class="users-top-selected">{{ active_filter }}</span>
		</h1>
		<div class="tracks-list" v-if="!loaders.get_top_tracks">
			<TopItem
				data-aos="fade-left"
				v-for="(top, index) in user_top"
				:key="top.id"
				:top="top"
				:order="index + 1"
			/>
		</div>
	</div>
</template>

<script>
import UserCardComponent from "@/components/UserCardComponent.vue";
import FilterComponent from "@/components/FilterComponent.vue";

import TopItem from "@/components/TopItem.vue";
import axios from "axios";
export default {
	components: {
		UserCardComponent,
		FilterComponent,
		TopItem,
	},

	data() {
		return {
			user_profile: {},
			user_top: {},
			active_filter: "artists",
			loaders: {
				get_user: true,
				get_top_tracks: true,
			},
		};
	},
	mounted() {
		if (window.localStorage.getItem("access_token") == null) {
			this.$router.push({ name: "PageAccessToken" });
			return;
		}
		this.fetchProfile();
	},
	methods: {
		/**
		 * Get spotify user profile
		 *
		 * @return void
		 */
		async fetchProfile() {
			this.loaders.get_user = true;
			axios
				.get(`${this.$config.API_URL}/v1/me`, {
					headers: {
						Authorization: `Bearer ${window.localStorage.getItem(
							"access_token"
						)}`,
					},
				})
				.then((response) => {
					this.user_profile = response.data;
				})
				.finally(() => {
					this.loaders.get_user = false;
					this.fetchTop();
				})
				.catch((err) => {
					console.error(err);
				});
		},

		/**
		 * Get top tracks of user
		 *
		 * @return void
		 */
		async fetchTop(active_filter = "artists") {
			this.loaders.get_top_tracks = true;

			this.active_filter = active_filter;
			let params = new URLSearchParams();
			params.append("limit", 5);
			axios
				.get(`${this.$config.API_URL}/v1/me/top/${this.active_filter}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${window.localStorage.getItem(
							"access_token"
						)}`,
					},
					params,
				})
				.then((response) => {
					console.log("RESPONSE", response.data.items);
					this.user_top = response.data.items;
				})
				.finally(() => {
					this.loaders.get_top_tracks = false;
				})
				.catch((err) => {
					console.error(err);
				});
		},
	},
	computed: {},
};
</script>

<style lang="scss" scoped>
.users-top {
	font-size: 5rem;

	&-selected {
		background: #1db954;
	}
}
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
