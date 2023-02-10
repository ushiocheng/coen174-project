// components/CourseListItem.vue
<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ course.courseName }}</v-list-item-title>
      <v-list-item-subtitle>{{ course.potentialSchedule }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn @click="deleteCourse">Delete</v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useCourseSelectedStore } from './state';

export default defineComponent({
  props: {
    course: {
      type: Object as () => {
        courseName: string;
        potentialSchedule: number;
      },
      required: true,
    },
  },
  setup(props, { emit }) {
    const { deleteCourse } = useCourseSelectedStore();

    const deleteCourse = () => {
      const index = this.courseSelected.findIndex(
        course => course.courseName === this.course.courseName
      );
      deleteCourse(index);
    };

    return { deleteCourse };
  },
});
</script>

<style lang="scss">
</style>
