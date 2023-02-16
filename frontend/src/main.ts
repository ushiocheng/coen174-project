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
import ProfileSwitcher from "./classes/ProfileSwitcher";

let profile = new ProfileSwitcher();

(async () => {
  const start = Date.now();

  // Test creating schedules for different people
  await profile.createNewProfile("Anthony's Schedule");
  await profile.createNewProfile("Jackson's Schedule");
  await profile.createNewProfile("Bad schedule");
  console.log(profile.getAllProfiles());

  // Test deleting specific schedules
  profile.removeProfile("Bad schedule");
  console.log(profile.getAllProfiles());

  // Test changing the profiles' names
  profile.editProfileName("Anthony's Schedule", "Anthony");
  profile.editProfileName("Jackson's Schedule", "Jackson");
  console.log(profile.getAllProfiles());

  // Switching to and using one person's schedule
  profile.switchActiveProfile("Jackson");
  await profile.changeQuarter("Winter 2022");
  await profile.includeCourse("ACTG 131"); // Returns true if successfully added, false otherwise
  await profile.includeCourse("ACTG 136");
  await profile.includeCourse("AMTH 106");
  await profile.includeCourse("AMTH 108");
  console.log(`${profile.getActiveProfileName()}'s schedules:`);
  console.log(profile.getSchedules());

  // Switching to and using another person's schedule
  profile.switchActiveProfile("Anthony");
  await profile.changeQuarter("Fall 2022");
  await profile.includeCourse("COEN 140");
  await profile.includeCourse("COEN 145");
  await profile.includeCourse("COEN 146");
  await profile.includeCourse("COEN 179");
  console.log(`${profile.getActiveProfileName()}'s schedules:`);
  console.log(profile.getSchedules());

  // Switch back to a saved profile
  profile.switchActiveProfile("Jackson");
  console.log(`${profile.getActiveProfileName()}'s schedules:`);
  console.log(profile.getSchedules());

  const end = Date.now();
  console.log("runtime: " + (end - start) / 1000);
})();
