import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";

const app = createApp(App);
app.directive("focus", {
  // When the bound element is mounted into the DOM...
  mounted(el) {
    // Focus the element
    el.focus();
  },
});
app.use(router);
app.mount("#app");
