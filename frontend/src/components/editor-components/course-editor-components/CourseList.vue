<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <course-picker />
      </v-col>
      <v-col cols="12">
        <v-list>
          <course-list-item v-for="(course, index) in courses" :key="index" :course="course" @deleteCourse="courses.splice(index,1)"/>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CoursePicker from './CoursePicker.vue';
import CourseListItem from './CourseListItem.vue';
import Course from '@/classes/Course';

export default defineComponent({
  name: 'CourseList',
  components: {
    CoursePicker,
    CourseListItem
  },
  props: {
    courses: {
      type: Array<Course>,
      required: true,
    },
  },
  setup() {
  }
});
</script>

<style>

</style>
