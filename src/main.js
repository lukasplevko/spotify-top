import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import config from "./config";
import "./theme/style.scss";
const pinia = createPinia();
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const app = createApp(App);
AOS.init();
app.config.globalProperties.$config = config;

app.use(pinia);
app.use(router);
app.mount("#app");
