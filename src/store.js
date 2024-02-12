import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({ tokens: { spotify: {}, apple: {} } }),
	getters: {
		has_spotify_token: (state) => {
			return Object.hasOwn(state.tokens.spotify, "access_token");
		},
	},
	actions: {
		/**
		 * Sets users streaming services tokens
		 *
		 * @param {object} payload
		 * @return void
		 */
		set_access_token(payload) {
			this.tokens[payload.service]["access_token"] = payload.access_token;
		},
	},
});
