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

  scheduler.changeQuarter("Spring 2023");
  console.log("Generating schedules for Spring 2023:");

  await scheduler.addCourse("ACTG 131");
  await scheduler.addCourse("ACTG 136");
  await scheduler.addCourse("AMTH 106");
  await scheduler.addCourse("AMTH 108");

  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);

  scheduler.changeQuarter("Winter 2023");
  console.log("Generating schedules for Winter 2023:");

  await scheduler.addCourse("COEN 145");
  await scheduler.addCourse("COEN 140");
  await scheduler.addCourse("COEN 146");
  await scheduler.addCourse("COEN 179");

  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);

  scheduler.changeQuarter("Fall 2022");
  console.log("Generating schedules for Fall 2022:");

  await scheduler.addCourse("ACTG 131");
  await scheduler.addCourse("ENGL 1A");
  await scheduler.addCourse("ACTG 136");
  await scheduler.addCourse("AMTH 106");

  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);

  const end = Date.now();
  console.log("runtime: " + (end - start) / 1000);
})();
