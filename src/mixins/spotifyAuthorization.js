export const spotifyAuthorization = {
	data() {
		return {
			code_verifier: null,
			clientId: "0a087b062d0b43c2983991dcf4131cf0",
			redirectUri: "http://localhost:8080",
		};
	},
	methods: {
		generateRandomString(length) {
			const possible =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const values = crypto.getRandomValues(new Uint8Array(length));
			return values.reduce((acc, x) => acc + possible[x % possible.length], "");
		},

		async sha256(plain) {
			const encoder = new TextEncoder();
			const data = encoder.encode(plain);
			return window.crypto.subtle.digest("SHA-256", data);
		},

		base64encode(input) {
			return btoa(String.fromCharCode(...new Uint8Array(input)))
				.replace(/=/g, "")
				.replace(/\+/g, "-")
				.replace(/\//g, "_");
		},

		async spotifyCodeChallenge() {
			this.code_verifier = this.generateRandomString(64);
			const hashed = await this.sha256(this.code_verifier);
			const code_challenge = this.base64encode(hashed);
			return code_challenge;
		},
	},
};
