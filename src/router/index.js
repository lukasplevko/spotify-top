import { createRouter, createWebHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import PageAuthorizeSpotify from "../pages/authorize/PageAuthorizeSpotify.vue";
import PageAccessToken from "../pages/authorize/PageAccessToken.vue";

import PageHome from "../pages/PageHome.vue";
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
	{
		path: "/authorize-spotify",
		name: "PageAuthorizeSpotify",
		component: PageAuthorizeSpotify,
	},
	{
		path: "/",
		name: "PageAccessToken",
		component: PageAccessToken,
	},
	{
		path: "/home",
		name: "PageHome",
		component: PageHome,
	},
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
});

export default router;
