import Scheduler from "./Scheduler";
import Section from "./Section";

export default class ProfileSwitcher {
  // Keep track of how many profiles have been created
  numProfiles: number;

  // All the schedules that can be switched between
  profiles: Map<string, Scheduler>;

  // The schedule currently selected
  activeProfile: Scheduler;

  // Name of the schedule currently selected
  activeProfileName: string;

  constructor() {
    this.profiles = new Map();
    this.numProfiles = 0;
  }

  async createNewProfile(
    name: string = `Profile ${(this.numProfiles + 1).toString()}`
  ) {
    if (name.length === 0)
      name = `Profile ${(this.numProfiles + 1).toString()}`;
    // Create and initialize a new scheduler object
    let newScheduler = new Scheduler();
    await newScheduler.preLoad();

    // Add it to the map of all schedulers
    this.profiles.set(name, newScheduler);
    this.numProfiles++;

    // Set the new one to be the active schedule
    this.activeProfile = newScheduler;
    this.activeProfileName = name;
  }

  removeProfile(name: string) {
    if (this.activeProfileName === name) {
      this.activeProfile = this.profiles.values().next().value;
      this.activeProfileName = this.profiles.keys().next().value;
    }
    this.profiles.delete(name);
    // localStorage.removeItem(name);
  }

  getAllProfiles() {
    return Array.from(this.profiles.entries());
  }

  switchActiveProfile(name: string) {
    if (this.profiles.has(name)) {
      this.activeProfile = this.profiles.get(name)!; // ! tells ts that this value will be defined
      this.activeProfileName = name;
    }
  }

  getActiveProfileName(): string {
    return this.activeProfileName;
  }

  editProfileName(oldName: string, newName: string) {
    if (newName.length === 0) return;
    if (this.profiles.has(oldName)) {
      const temp: Scheduler = this.profiles.get(oldName)!;
      this.profiles.delete(oldName);
      this.profiles.set(newName, temp);
    }

    if (this.activeProfileName === oldName) this.activeProfileName = newName;
  }

  async changeQuarter(quarter: string) {
    await this.activeProfile.changeQuarter(quarter);
  }

  includeCourse(courseTitle: string): boolean {
    return this.activeProfile.addCourse(courseTitle);
  }

  removeCourse(courseTitle: string): boolean {
    console.log(courseTitle);
    return this.activeProfile.removeCourse(courseTitle);
  }

  getIncludedCourses(): string[] {
    return Array.from(this.activeProfile.selectedCourses.keys());
  }

  getSchedules(): Section[][] {
    this.activeProfile.buildSchedules();
    return this.activeProfile.scheduleList;
  }

  // saveActiveProfile() {
  //   localStorage.setItem(
  //     this.activeProfileName,
  //     JSON.stringify(this.activeProfile)
  //   );
  // }

  // saveAllProfiles() {}
}
