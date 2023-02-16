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
  const start = Date.now();
  await scheduler.preLoad();


  //scheduler.createBuffer(0);
  await scheduler.addCourse("ACTG 131"); // Returns true if successfully added, false otherwise
  await scheduler.addCourse("ACTG 136");
  await scheduler.addCourse("AMTH 106");
  await scheduler.addCourse("AMTH 108");

  console.log("Generating schedules for:");
  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);

  const end = Date.now();
  console.log("runtime: " + (end - start) / 1000);
})();
