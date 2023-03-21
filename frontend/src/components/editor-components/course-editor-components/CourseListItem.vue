// components/CourseListItem.vue
<template>
  <div id="listitem">
    <p>CoursesEditor/ListItem</p>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title id="course"
          >{{ course.subject }} {{ course.courseID }}</v-list-item-title
        >
        <v-list-item-subtitle>{{
          potentialSchedule ? potentialSchedule : 0
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn id="delete"
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

<style lang="scss">
#delete{/*delete */
  background-color: #fa5f55;
  height: 30px;
  min-width: 15px;
  padding: 8px;
}
#listitem{/*CoursesEditor/ListItem */
  border: 1px solid #b30738; 
  border-radius: 5px;
  margin: 10px;
  background-color: #a4dbe8 ;
  width: 35%;
  padding: 5px;
}/*use  #e9e8d5 for rule list */
#course{/*COEN 123 */
  /*border: 1px;
  border-style: groove;
  border-radius: 5px;*/
  width: 50%;
}
</style>
