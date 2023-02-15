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
  await scheduler.requester.set();
  await scheduler.preLoad();
  //await scheduler.addCourse("ACTG 131");
  // await scheduler.addCourse("ENGL 1A");
  // await scheduler.addCourse("ACTG 136");
  // await scheduler.addCourse("AMTH 106");
  // await scheduler.addCourse("AMTH 108");
  // await scheduler.addCourse("ELEN 50");

  // console.log(await scheduler.addCourse("COEN 145"));
  // console.log(await scheduler.addCourse("COEN 140"));
  // console.log(await scheduler.addCourse("COEN 146"));
  // console.log(await scheduler.addCourse("COEN 179"));

  await scheduler.addCourse("COEN 145")
  await scheduler.addCourse("COEN 140")
  await scheduler.addCourse("COEN 146")
  await scheduler.addCourse("COEN 179")


  //scheduler.removeCourse("ELEN 50");
  scheduler.buildSchedules();
  console.log(scheduler.scheduleList.length);
  for (let item of scheduler.scheduleList) console.log(item);
  
  const end = Date.now();
  console.log("runtime:",(end-start)/1000);
})();
