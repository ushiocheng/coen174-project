// components/CourseListItem.vue
<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>CoursesEditor/ListItem</p>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          >{{ course.subject }} {{ course.courseID }}</v-list-item-title
        >
        <v-list-item-subtitle>{{
          potentialSchedule ? potentialSchedule : 0
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          @click="
            () => $emit('deleteCourse', `${course.subject} ${course.courseID}`)
          "
          >X</v-btn
        >
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import Course from "@/classes/Course";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    course: {
      type: Course,
      required: true,
    },
    potentialSchedule: {
      type: Number,
      required: false,
    },
  },
});
</script>

<style lang="scss"></style>
