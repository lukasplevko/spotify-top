<template>
	<div></div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "@/store";
import { spotifyAuthorization } from "@/mixins/spotifyAuthorization.js";
import { mapState } from "pinia";
import axios from "axios";

export default {
	mixins: [spotifyAuthorization],
	data() {
		return {};
	},
	async mounted() {
		if (!Object.hasOwn(window.localStorage, "code_verifier")) {
			this.$router.push({ name: "PageAuthorizeSpotify" });
			return;
		}
		await this.getToken();
	},
	methods: {
		...mapActions(useUserStore, ["set_access_token"]),

		/**
		 * Retrieves spotify access_token
		 *
		 * @return void
		 */
		async getToken() {
			if (this.has_spotify_token) {
				this.$router.push({ name: "PageHome" });
				return;
			}
			// stored in the previous step
			let codeVerifier = window.localStorage.getItem("code_verifier");
			const code = this.$router.currentRoute.value.query.code;

			const url = "https://accounts.spotify.com/api/token";

			const params = new URLSearchParams({
				client_id: this.clientId,
				grant_type: "authorization_code",
				code,
				redirect_uri: this.redirectUri,
				code_verifier: codeVerifier,
			});
			axios
				.post(url, params, {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				})
				.then(async (response) => {
					window.localStorage.setItem(
						"access_token",
						response.data.access_token
					);
				})

				.finally(() => {
					this.$router.push({ name: "PageHome" });
				});
		},

		storeAccessToken(token) {
			const data = {
				service: "spotify",
				access_token: token,
			};
			this.set_access_token(data);
		},
	},
	computed: {
		...mapState(useUserStore, ["has_spotify_token"]),
	},
};
</script>

<style lang="scss" scoped></style>
