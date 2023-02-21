<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>CoursesEditor/CourseList</p>
    <v-container>
      <v-list>
        <course-list-item
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
          @deleteCourse="courses.splice(index, 1)"
        />
      </v-list>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CoursePicker from "./CoursePicker.vue";
import CourseListItem from "./CourseListItem.vue";
import Course from "@/classes/Course";

export default defineComponent({
  name: "CourseList",
  components: {
    CoursePicker,
    CourseListItem,
  },
  props: {
    courses: {
      type: Array<Course>,
      required: true,
    },
  },
  setup() {},
});
</script>

<style></style>
