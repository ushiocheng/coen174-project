<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>CoursesEditor</p>
    <course-list :courses="courses" />
    <course-picker @addCourse="(c) => {addCourse(c);}" />
  </div>
</template>

<script lang="ts">
import CourseList from "./course-editor-components/CourseList.vue";
import CoursePicker from "./course-editor-components/CoursePicker.vue";
import Course from "@/classes/Course";

//* Example Code
const exampleCourse1: Course = new Course("COEN", "123");
const exampleCourse2: Course = new Course("COEN", "456");
const exampleCourse3: Course = new Course("COEN", "123");
let courses: Array<Course> = [exampleCourse1, exampleCourse2, exampleCourse3];
// let courses: Array<Course> = [];

export default {
  components: { CourseList, CoursePicker },
  data() {
    return {
      courses,
    };
  },
  methods: {
    addCourse(courseName: string) {
      const dept = courseName.split(" ")[0];
      const num = courseName.substring(dept.length + 1);
      courses.push(new Course(dept, num));
    },
  },
};
</script>

<style></style>
