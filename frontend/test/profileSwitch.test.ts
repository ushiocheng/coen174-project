import { assert, expect, test } from "vitest";
import ProfileSwitcher from "../src/classes/ProfileSwitcher";

test("create profile", async () => {
  let profiles = new ProfileSwitcher();

  // Profile name assignment works
  await profiles.createNewProfile("P1");
  expect(profiles.getActiveProfileName()).toBe("P1");
});

test("create multiple profiles", async () => {
  let profiles = new ProfileSwitcher();
  // Profile name assignment defaults for invalid names (empty strings or no param)
  await profiles.createNewProfile("P1");
  await profiles.createNewProfile("");
  await profiles.createNewProfile();

  const [[n1, r1], [n2, r2], [n3, r3]] = profiles.getAllProfiles();
  // Defaults for n2, n3
  expect(n1).toBe("P1");
  expect(n2).toBe("Profile 2");
  expect(n3).toBe("Profile 3");
});

test("remove profile in list", async () => {
  let profiles = new ProfileSwitcher();
  await profiles.createNewProfile();
  await profiles.createNewProfile();
  await profiles.createNewProfile("Bad Profile");
  await profiles.createNewProfile();

  // Remove profiles that are in list
  profiles.removeProfile("Bad Profile");
  expect(profiles.getAllProfiles().length).toBe(3);

  profiles.removeProfile("Profile 4");
  expect(profiles.getAllProfiles().length).toBe(2);

  // Remove profile that is not in list
  profiles.removeProfile("Not a profile");
  expect(profiles.getAllProfiles().length).toBe(2);
});

test("remove profile not in list", async () => {
  let profiles = new ProfileSwitcher();
  await profiles.createNewProfile();
  await profiles.createNewProfile();
  await profiles.createNewProfile();

  // Remove profile that is not in list
  profiles.removeProfile("Not a profile");
  expect(profiles.getAllProfiles().length).toBe(3);
});

test("switch profile", async () => {
  let profiles = new ProfileSwitcher();
  await profiles.createNewProfile();
  await profiles.createNewProfile();

  // Active profile
  expect(profiles.getActiveProfileName()).toBe("Profile 2");

  // Switch to another profile
  profiles.switchActiveProfile("Profile 1");
  expect(profiles.getActiveProfileName()).toBe("Profile 1");

  // Try to switch to profile that doesn't exist
  profiles.switchActiveProfile("Invalid Profile");
  expect(profiles.getActiveProfileName()).toBe("Profile 1");
});

test("edit profile name", async () => {
  let profiles = new ProfileSwitcher();
  await profiles.createNewProfile();
  await profiles.createNewProfile();

  expect(profiles.getActiveProfileName()).toBe("Profile 2");

  // Change profile name of active and non active profiles
  profiles.editProfileName("Profile 1", "first profile");
  profiles.editProfileName("Profile 2", "second profile");
  const [[n1, r1], [n2, r2]] = profiles.getAllProfiles();

  expect(n1).toBe("first profile");
  expect(n2).toBe("second profile");
});

test("use case 1", async () => {
  let profile = new ProfileSwitcher();

  // Test creating schedules for different people
  await profile.createNewProfile("Anthony's Schedule");
  await profile.createNewProfile("Jackson's Schedule");
  await profile.createNewProfile("Bad schedule");
  expect(profile.getAllProfiles().length).toBe(3);

  // Test deleting specific schedules
  profile.removeProfile("Bad schedule");
  expect(profile.getAllProfiles().length).toBe(2);

  // Test changing the profiles' names
  profile.editProfileName("Anthony's Schedule", "Anthony");
  profile.editProfileName("Jackson's Schedule", "Jackson");
  expect(profile.getAllProfiles()[0][0]).toBe("Anthony");

  // Switching to and using one person's schedule
  profile.switchActiveProfile("Jackson");
  await profile.changeQuarter("Winter 2022");
  await profile.includeCourse("ACTG 131"); // Returns true if successfully added, false otherwise
  await profile.includeCourse("ACTG 136");
  await profile.includeCourse("AMTH 106");
  await profile.includeCourse("AMTH 108");
  expect(profile.getSchedules().length).toBe(26);

  // Switching to and using another person's schedule
  profile.switchActiveProfile("Anthony");
  await profile.changeQuarter("Fall 2022");
  await profile.includeCourse("COEN 140");
  await profile.includeCourse("COEN 145");
  await profile.includeCourse("COEN 146");
  await profile.includeCourse("COEN 179");
  expect(profile.getSchedules().length).toBe(4);
});
