<template>
  <div id="mainview">
    <p>Main View</p>
    <editor :profiles="profiles" :courses="courses" />
    <schedule-chooser
      :profiles="profiles"
      @generateSchedules="
        () => {
          validSchedules = profiles.getSchedules();
          showSchedules();
        }
      "
    />
    <timetable />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

import Editor from "@/components/Editor.vue";
import ScheduleChooser from "@/components/ScheduleChooser.vue";
import timetable from "@/components/timetable.vue";

import ProfileSwitcher from "@/classes/ProfileSwitcher";
import Section from "@/classes/Section";
import Course from "@/classes/Course";

let profiles = new ProfileSwitcher();
profiles.createNewProfile();

let courses = ref<Array<Course>>([]);

let validSchedules: Section[][];

export default {
  components: { Editor, ScheduleChooser, timetable },
  data() {
    return {
      profiles,
      validSchedules,
      courses,
    };
  },
  methods: {
    showSchedules() {
      console.log(profiles.getIncludedCourses());
      console.log(this.validSchedules);
    },
  },
};
</script>

<style>
#mainview{
  border: 1px solid red;
  margin: 10px;
  background-color: #b30738;
  border-radius: 5px;
  padding:5px;
}
</style>
