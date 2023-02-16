import { assert, expect, test } from "vitest";
import ProfileSwitcher from "../src/classes/ProfileSwitcher";
// import {mount} from '@vue/test-utils'
// import DummyForTest from '@/components/DummyForTest.vue'

test("dummyTest", () => {
  expect(0).toBe(0);
});

test("switch profiles", async () => {
  let profiles = new ProfileSwitcher();
  await profiles.createNewProfile("P1");
  expect(profiles.getActiveProfileName()).toBe("P1");
});

test("create multiple profiles", async () => {
  let profiles = new ProfileSwitcher();
  await profiles.createNewProfile("P1");
  await profiles.createNewProfile("");
  await profiles.createNewProfile();
  const [[n1, r1], [n2, r2], [n3, r3]] = profiles.getAllProfiles();
  expect(n1).toBe("P1");
  expect(n2).toBe("Profile 2");
  expect(n3).toBe("Profile 3");
});

// test('component', async() => {
//     expect (DummyForTest).toBeTruthy();
//     const instant = mount(DummyForTest);
//     expect(instant.text()).toContain('Hello world');
// })
