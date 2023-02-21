<template>
  <course-list />
  <course-picker />
</template>

<script lang="ts">
import CourseList from "./course-editor-components/CourseList.vue";
import CoursePicker from "./course-editor-components/CoursePicker.vue";
import Course from "@/classes/Course"

let courses: Array<Course> = [];

export default {
  components: { CourseList, CoursePicker },
};
</script>

<style></style>
