<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="courseName" label="Course Name"></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-btn @click="addCourse">Add Course</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CoursePicker',
  setup() {
    const courseName = ref('');
    const potentialSchedule = ref(0);

    function addCourse() {
      state.courseSelected.push({
        courseName: courseName.value,
        potentialSchedule: potentialSchedule.value
      });
      // Reset the values to the default
      courseName.value = '';
      potentialSchedule.value = 0;
    }

    return {
      courseName,
      addCourse
    };
  }
});
</script>

<style>

</style>
