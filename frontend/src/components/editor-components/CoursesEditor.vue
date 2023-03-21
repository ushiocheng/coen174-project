<template>
  <div id="courseseditor">
    <p>CoursesEditor</p>
    <course-list :profiles="profiles" :courses="courses" />
    <course-picker
      @addCourse="
        (c) => {
          addCourse(c);
        }
      "
    />
  </div>
</template>

<script lang="ts">
import CourseList from "./course-editor-components/CourseList.vue";
import CoursePicker from "./course-editor-components/CoursePicker.vue";
import Course from "@/classes/Course";
import ProfileSwitcher from "@/classes/ProfileSwitcher";

//* Example Code
// const exampleCourse1: Course = new Course("COEN", "123");
// const exampleCourse2: Course = new Course("COEN", "456");
// const exampleCourse3: Course = new Course("COEN", "123");
// let courses: Array<Course> = [exampleCourse1, exampleCourse2, exampleCourse3];

export default {
  components: { CourseList, CoursePicker },
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
  methods: {
    addCourse(courseName: string) {
      console.log(this.profiles);
      if (this.profiles.includeCourse(courseName)) {
        // if(courses.)
        const [dept, num] = courseName.split(" ");
        this.courses.push(new Course(dept, num));
      }
    },
  },
  // data() {
  //   return {
  //     courses: ref([]),
  //   };
  // },
  // methods: {
  //   addCourse(courseName: string) {
  //     const dept = courseName.split(" ")[0];
  //     const num = courseName.substring(dept.length + 1);
  //     this.courses.push(new Course(dept, num));
  //     courses.push(new Course(dept, num));
  //     console.log(courses);
  //   },
  // },
};
</script>

<style>
#courseseditor{
  border: 1px solid red; 
  margin: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  padding:5px;
}</style>
