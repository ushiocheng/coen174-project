<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <course-picker />
      </v-col>
      <v-col cols="12">
        <v-list>
          <course-list-item v-for="(course, index) in courses" :key="index" :course="course"/>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import CoursePicker from './CoursePicker.vue';
import CourseListItem from './CourseListItem.vue';
import { state } from '@/store/state';

export default defineComponent({
  name: 'CourseList',
  components: {
    CoursePicker,
    CourseListItem
  },
  setup() {
    const courses = computed(() => state.courseSelected);

    return {
      courses
    };
  }
});
</script>

<style>

</style>
