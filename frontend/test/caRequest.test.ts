import { assert, expect, test } from "vitest";
import CARequest from "../src/classes/CARequest";

test("get list of all quarters", async () => {
  let requester = new CARequest();
  let list = await requester.getQuarters();

  expect(list.length).toBe(8);
});

test("set active quarter", async () => {
  let requester = new CARequest();
  await requester.setQuarterList();

  // Check the default value
  expect(requester.activeQuarter).toBe("Summer 2023");

  // Change quarter
  requester.setActiveQuarter("Winter 2023");
  expect(requester.activeQuarter).toBe("Winter 2023");
});

test("set active quarter to invalid quarter", async () => {
  let requester = new CARequest();
  await requester.setQuarterList();

  // Check the default value
  expect(requester.activeQuarter).toBe("Summer 2023");

  // Change quarter
  requester.setActiveQuarter("Autumn 2025");
  expect(requester.activeQuarter).toBe("Summer 2023");
});

test("change career", async () => {
  let requester = new CARequest();
  await requester.setQuarterList();

  // Check default career
  expect(requester.career).toBe("ugrad");

  requester.setCareer("grad");
  expect(requester.career).toBe("grad");

  requester.setCareer("myCareer");
  expect(requester.career).toBe("grad");
});
