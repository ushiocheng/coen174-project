import { assert, expect, test } from "vitest";
import Scheduler from "../src/classes/Scheduler";

test("add valid course", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Add valid courses
  await scheduler.addCourse("MATH 9");
  expect(scheduler.selectedCourses.size).toBe(1);

  // Add valid course, using different capitalization
  await scheduler.addCourse("Math 11");
  expect(scheduler.selectedCourses.size).toBe(2);
});

test("add invalid course", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Try to add course that is not offered
  await scheduler.addCourse("Math 1111");
  expect(scheduler.selectedCourses.size).toBe(0);
});

test("add duplicate course", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Try to add the same course twice
  await scheduler.addCourse("Math 11");
  await scheduler.addCourse("Math 11");
  expect(scheduler.selectedCourses.size).toBe(1);
});

test("remove course in list", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Add course
  await scheduler.addCourse("COEN 10");
  expect(scheduler.selectedCourses.size).toBe(1);

  // Remove the course, using different capitalization
  scheduler.removeCourse("Coen 10");
  expect(scheduler.selectedCourses.size).toBe(0);
});

test("remove course not in list", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Add course
  await scheduler.addCourse("COEN 10");
  expect(scheduler.selectedCourses.size).toBe(1);

  // Try to remove course that is not in the list
  scheduler.removeCourse("Not in list");
  expect(scheduler.selectedCourses.size).toBe(1);
});

test("change quarter", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  expect(scheduler.requester.activeQuarter).toBe("Fall 2021");
  await scheduler.changeQuarter("Fall 2022");
  expect(scheduler.requester.activeQuarter).toBe("Fall 2022");
});

test("change quarter clears selected courses", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Add course that is valid for fall 2021
  await scheduler.addCourse("COEN 166");
  expect(scheduler.selectedCourses.size).toBe(1);

  // Test if changing quarter works and clears selected courses
  await scheduler.changeQuarter("Winter 2023");
  expect(scheduler.requester.activeQuarter).toBe("Winter 2023");
  expect(scheduler.selectedCourses.size).toBe(0);
});

test("change quarter to invalid quarter", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  expect(scheduler.requester.activeQuarter).toBe("Fall 2021");
  await scheduler.changeQuarter("invalid quarter");
  expect(scheduler.requester.activeQuarter).toBe("Fall 2021");
});

test("build schedule easy", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Test schedule builder for simple course inputs
  await scheduler.addCourse("Math 9");
  await scheduler.addCourse("COEN 10");
  scheduler.buildSchedules();

  expect(scheduler.scheduleList.length).toBe(18);
});

test("build schedule hard", async () => {
  let scheduler = new Scheduler();
  await scheduler.preLoad();

  // Test for more complicated course inputs
  await scheduler.changeQuarter("Fall 2022");

  await scheduler.addCourse("COEN 145");
  await scheduler.addCourse("COEN 140");
  await scheduler.addCourse("COEN 146");
  await scheduler.addCourse("COEN 179");
  scheduler.buildSchedules();

  expect(scheduler.scheduleList.length).toBe(4);
});
