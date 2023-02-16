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

  await scheduler.changeQuarter("Spring 2023");
  await scheduler.addCourse("ANTH 11A");
  await scheduler.addCourse("PSYC 1");
  await scheduler.addCourse("ENGL 28");
  await scheduler.addCourse("ACTG 131");
  console.log("Generating schedules for Spring 2023:");
  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);

  await scheduler.changeQuarter("Winter 2023");
  await scheduler.addCourse("ANTH 11A");
  await scheduler.addCourse("PSYC 1");
  await scheduler.addCourse("ENGL 28");
  await scheduler.addCourse("ACTG 131");
  console.log("Generating schedules for Winter 2023:");
  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);


  scheduler.createBuffer(30)
  await scheduler.changeQuarter("Fall 2022");
  await scheduler.addCourse("ANTH 11A");
  await scheduler.addCourse("PSYC 1");
  await scheduler.addCourse("ENGL 28");
  await scheduler.addCourse("ACTG 131");
  console.log("Generating schedules for Fall 2022:");
  console.log(scheduler.selectedCourses);
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList);

  const end = Date.now();
  console.log("runtime: " + (end - start) / 1000);
})();


//class list with a diverse list of sections with potential for...
//MWF classes as well as TR classes:
//ANTH 11A
//PSYC 1
//ENGL 28
//ACTG 131


//for testing:
// await scheduler.addCourse("ACTG 131");
// await scheduler.addCourse("ENGL 1A");
// await scheduler.addCourse("ACTG 136");
// await scheduler.addCourse("AMTH 106");

// await scheduler.addCourse("COEN 145");
// await scheduler.addCourse("COEN 140");
// await scheduler.addCourse("COEN 146");
// await scheduler.addCourse("COEN 179");

// await scheduler.addCourse("ACTG 131");
// await scheduler.addCourse("ACTG 136");
// await scheduler.addCourse("AMTH 106");
// await scheduler.addCourse("AMTH 108");

