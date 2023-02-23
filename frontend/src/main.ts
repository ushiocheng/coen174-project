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

import Scheduler from "./classes/Scheduler";

let scheduler = new Scheduler();

// Look into frontend/test for examples on how to use each class
(async () => {
    const start = Date.now();
    await scheduler.preLoad();
  
    console.log("Spring 2023:")
    await scheduler.changeQuarter("Spring 2023");
    //ANTH 11A MATH 9
    scheduler.addCourse("ANTH 11A");
    scheduler.addCourse("PSYC 1");
    scheduler.addCourse("ENGL 28");
    scheduler.addCourse("ACTG 131");
    console.log("courses added: ", scheduler.selectedCourses);
    console.log("Generating schedules for Spring 2023:");
    await scheduler.buildSchedules();
    console.log(scheduler.scheduleList);
    console.log("filled sections:")
    console.log(scheduler.filledSections)
  
    console.log("Winter 2023:")
    await scheduler.changeQuarter("Winter 2023");
    scheduler.addCourse("ANTH 11A");
    scheduler.addCourse("PSYC 1");
    scheduler.addCourse("ENGL 28");
    scheduler.addCourse("ACTG 131");
    console.log("courses added: ", scheduler.selectedCourses);
    console.log("Generating schedules for Winter 2023:");
    await scheduler.buildSchedules();
    console.log(scheduler.scheduleList);
    console.log("filled sections:")
    console.log(scheduler.filledSections)
  
    console.log("Fall 2022:")
    await scheduler.changeQuarter("Fall 2022");
    scheduler.addCourse("ANTH 11A");
    scheduler.addCourse("PSYC 1");
    scheduler.addCourse("ENGL 28");
    scheduler.addCourse("ACTG 131");
    console.log("courses added: ", scheduler.selectedCourses);

    console.log("Gap between classes: 30 minutes")
    scheduler.createBuffer(30)
    await scheduler.buildSchedules();
    console.log("Generating schedules for Fall 2022:")
    console.log(scheduler.scheduleList);
    console.log("filled sections:")
    console.log(scheduler.filledSections)
  
    console.log("Gap between classes: 90 minutes")
    scheduler.createBuffer(90)
    await scheduler.buildSchedules();
    console.log("Generating schedules for Fall 2022:")
    console.log(scheduler.scheduleList);
    console.log("filled sections:")
    console.log(scheduler.filledSections)
  
    console.log("Gap between classes: 270 minutes")
    scheduler.createBuffer(270)
    await scheduler.buildSchedules();
    console.log("Generating schedules for Fall 2022:")
    console.log(scheduler.scheduleList);
    console.log("filled sections:")
    console.log(scheduler.filledSections)
  
    const end = Date.now();
    console.log("runtime: " + (end - start) / 1000);
  })();