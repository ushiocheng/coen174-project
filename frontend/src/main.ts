/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

/*Testing*/
import Scheduler from "./classes/Scheduler";

let scheduler = new Scheduler();
(async () => {
  await scheduler.preLoad();
  await scheduler.addCourse("ACTG 131");
  await scheduler.addCourse("ACTG 136");
  await scheduler.addCourse("AMTH 106");
  await scheduler.addCourse("AMTH 108");
  await scheduler.addCourse("ELEN 50");
  scheduler.removeCourse("ELEN 50");
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);
  for (let item of scheduler.scheduleList) console.log(item);
})();
