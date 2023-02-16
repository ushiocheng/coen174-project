import Scheduler from "./Scheduler";
import Section from "./Section";

export default class ScheduleSwitcher {
  // Keep track of how many schedules have been created
  numSchedules: number;

  // All the schedules that can be switched between
  schedules: Map<string, Scheduler>;

  // The schedule currently selected
  activeSchedule: Scheduler;

  activeScheduleName: string;

  constructor() {
    this.schedules = new Map();
    this.numSchedules = 0;
  }

  async createNewSchedule(
    name: string = `Schedule ${(this.numSchedules + 1).toString()}`
  ) {
    // Create and initialize a new scheduler object
    let newScheduler = new Scheduler();
    await newScheduler.preLoad();

    // Add it to the map of all schedulers
    this.schedules.set(name, newScheduler);
    this.numSchedules++;

    // Set the new one to be the active schedule
    this.activeSchedule = newScheduler;
    this.activeScheduleName = name;
  }

  removeSchedule(name: string) {
    if (this.activeScheduleName === name) {
      this.activeSchedule = this.schedules.values().next().value;
      this.activeScheduleName = this.schedules.keys().next().value;
    }
    this.schedules.delete(name);
  }

  getAllSchedules() {
    return Array.from(this.schedules.entries());
  }

  switchActiveSchedule(name: string) {
    if (this.schedules.has(name)) {
      this.activeSchedule = this.schedules.get(name)!; // ! tells ts that this value will be defined
      this.activeScheduleName = name;
    }
  }

  getActiveScheduleName(): string {
    return this.activeScheduleName;
  }

  changeScheduleName(oldName: string, newName: string) {
    if (this.schedules.has(oldName)) {
      const temp: Scheduler = this.schedules.get(oldName)!;
      this.schedules.delete(oldName);
      this.schedules.set(newName, temp);
    }
  }

  async changeQuarter(quarter: string) {
    await this.activeSchedule.changeQuarter(quarter);
  }

  async includeCourse(courseTitle: string): Promise<boolean> {
    return await this.activeSchedule.addCourse(courseTitle);
  }

  removeCourse(courseTitle: string): boolean {
    return this.activeSchedule.removeCourse(courseTitle);
  }

  getIncludedCourses(): string[] {
    return Array.from(this.activeSchedule.selectedCourses.keys());
  }

  getSchedules(): Section[][] {
    if (this.activeSchedule.scheduleList.length > 0) {
      return this.activeSchedule.scheduleList;
    }

    this.activeSchedule.buildSchedules();
    return this.activeSchedule.scheduleList;
  }
}
