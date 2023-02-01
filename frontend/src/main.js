import { createApp } from "vue";
import App from "./App.vue";
import CARequest from "./components/requestNew";

createApp(App).mount("#app");

// Create a request object
// NOTE: this takes a bit to fetch some stuff so setTimeout is used below to wait
let req = new CARequest("Fall 2022");

// Can use CARequest functions as needed.
// (setTimeout won't be needed in final code because delay will be generated naturally by the user
// taking time to enter a query)
setTimeout(() => {
  req.getSearchResults("COEN 12").then((results) => {
    console.log(results);
  });
}, 2000);
