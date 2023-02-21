<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>CoursesEditor</p>
    <course-list :courses="courses" />
    <course-picker />
  </div>
</template>

<script lang="ts">
import CourseList from "./course-editor-components/CourseList.vue";
import CoursePicker from "./course-editor-components/CoursePicker.vue";
import Course from "@/classes/Course";

//* Example Code
const exampleCourse1: Course = new Course("COEN", "123");
const exampleCourse2: Course = new Course("COEN", "456");
let courses: Array<Course> = [exampleCourse1, exampleCourse2];
// let courses: Array<Course> = [];

export default {
  components: { CourseList, CoursePicker },
  data() {
    return {
      courses,
    };
  },
};
</script>

<style></style>
