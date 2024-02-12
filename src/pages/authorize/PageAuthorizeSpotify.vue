<template>
	<div>Authorizing spotify...</div>
</template>

<script>
import { spotifyAuthorization } from "@/mixins/spotifyAuthorization.js";
import { mapStores } from "pinia";
import { useUserStore } from "@/store";

export default {
	name: "PageAuthorizeSpotify",
	mixins: [spotifyAuthorization],

	data() {},
	mounted() {
		console.log("Im starting here");
		this.spotifyRequestAuthorization();
	},
	methods: {
		async spotifyRequestAuthorization() {
			const code_challenge = await this.spotifyCodeChallenge();

			const scope = "user-read-private user-read-email user-top-read";
			const authUrl = new URL("https://accounts.spotify.com/authorize");

			// generated in the previous step
			window.localStorage.setItem("code_verifier", this.code_verifier);

			const params = {
				response_type: "code",
				client_id: this.clientId,
				scope,
				code_challenge_method: "S256",
				code_challenge: code_challenge,
				redirect_uri: this.redirectUri,
			};
			authUrl.search = new URLSearchParams(params).toString();
			window.location.href = authUrl.toString();
		},
	},
	computed: {
		...mapStores(useUserStore),
	},
};
</script>

<style lang="scss" scoped></style>
