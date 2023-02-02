<template>
  <course-list />
  <course-picker />
</template>

<script>
import CourseList from "./course-editor-components/CourseList.vue";
import CoursePicker from "./course-editor-components/CoursePicker.vue";
export default {
  components: { CourseList, CoursePicker },
};
</script>

<style></style>
