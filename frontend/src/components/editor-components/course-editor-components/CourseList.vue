<template>
  <div id="courselist">
    <p>CoursesEditor/CourseList</p>
    <v-container>
      <v-list>
        <course-list-item
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
          @deleteCourse="
            (name: string) => {
              profiles.removeCourse(name);
              courses.splice(index, 1);
            }
          "
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
import ProfileSwitcher from "@/classes/ProfileSwitcher";

export default defineComponent({
  name: "CourseList",
  components: {
    CoursePicker,
    CourseListItem,
  },
  props: {
    profiles: {
      type: ProfileSwitcher,
      required: true,
    },
    courses: {
      type: Array<Course>,
      required: true,
    },
  },
  setup() {},
});
</script>

<style>
#courselist{
  /*border: 1px groove #9e1b32;*/
  margin: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  padding:5px;
}</style>
