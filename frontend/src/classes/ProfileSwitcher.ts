import Scheduler from "./Scheduler";
import Section from "./Section";

export default class ProfileSwitcher {
  // All the schedules that can be switched between
  profiles: Map<string, Scheduler>;

  // The schedule currently selected
  activeProfile: Scheduler = new Scheduler();

  // Name of the schedule currently selected
  activeProfileName: string = "Default";

  constructor() {
    this.profiles = new Map();
    this.createNewProfile("Default");
  }

  async createNewProfile(name: string = "") {
    if (name.length === 0)
      name = `Profile ${(this.profiles.keys.length + 1).toString()}`;

    // Create and initialize a new scheduler object
    let newScheduler = new Scheduler();

    // Add it to the map of all schedulers
    this.profiles.set(name, newScheduler);

    return newScheduler.preLoad().then(() => {
      // Set the new one to be the active schedule
      this.activeProfile = newScheduler;
      this.activeProfileName = name;
    });
  }

  removeProfile(name: string) {
    if (name==="Default") {
      console.log("[WARN] deleting default profile is converted to clearring profile");
      this.profiles.get("Default")?.clearCourses();
      return;
    }
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

  async getQuarters() {
    return await this.activeProfile.getAllQuarters();
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

  getClassList(): Set<string> {
    return this.activeProfile.classList;
  }

  // saveActiveProfile() {
  //   localStorage.setItem(
  //     this.activeProfileName,
  //     JSON.stringify(this.activeProfile)
  //   );
  // }

  // saveAllProfiles() {}
}
