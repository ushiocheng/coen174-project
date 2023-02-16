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
import ScheduleSwitcher from "./classes/ScheduleSwitcher";

let schedules = new ScheduleSwitcher();

(async () => {
  const start = Date.now();

  // Test creating schedules for different people
  await schedules.createNewSchedule("Anthony's Schedule");
  await schedules.createNewSchedule("Jackson's Schedule");
  await schedules.createNewSchedule("Bad schedule");
  console.log(schedules.getAllSchedules());

  // Test deleting specific schedules
  schedules.removeSchedule("Bad schedule");
  console.log(schedules.getAllSchedules());

  // Switching to and using one person's schedule
  schedules.switchActiveSchedule("Jackson's Schedule");
  await schedules.changeQuarter("Winter 2022");
  await schedules.includeCourse("ACTG 131"); // Returns true if successfully added, false otherwise
  await schedules.includeCourse("ACTG 136");
  await schedules.includeCourse("AMTH 106");
  await schedules.includeCourse("AMTH 108");
  console.log(`${schedules.getActiveScheduleName()}'s schedules:`);
  console.log(schedules.getSchedules());

  // Switching to and using another person's schedule
  schedules.switchActiveSchedule("Anthony's Schedule");
  await schedules.changeQuarter("Fall 2022");
  await schedules.includeCourse("COEN 140");
  await schedules.includeCourse("COEN 146");
  await schedules.includeCourse("COEN 145");
  await schedules.includeCourse("COEN 179");
  console.log(`${schedules.getActiveScheduleName()}'s schedules:`);
  console.log(schedules.getSchedules());

  schedules.switchActiveSchedule("Jackson's Schedule");
  console.log(`${schedules.getActiveScheduleName()}'s schedules:`);
  console.log(schedules.getSchedules());

  // console.log("Generating schedules for:");
  // console.log(scheduler.selectedCourses);
  // scheduler.buildSchedules();
  // console.log(scheduler.scheduleList);

  const end = Date.now();
  console.log("runtime: " + (end - start) / 1000);
})();
