<template>
  <div id="coursepicker">
    <p>CoursesEditor/CoursePicker</p>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field id="coursename" label="Course Name" v-model="courseName"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-btn id="addcourse" @click="() => $emit('addCourse', courseName.toUpperCase())"
            >Add Course</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
/*import classes from 'code-snippets\filterTest.js'*/
export default defineComponent({
  name: "CoursePicker",
  setup() {},
  data() {
    return {
      courseName: "",
    };
  },
});
</script>
<style>
/*.v-btn {}*/
#coursepicker{/*CoursesEditor/CoursePicker*/ 
  /*border: 1px solid red;*/ 
  margin: 10px;
  background-color: #f4f2f0;
  border-radius: 5px;
  padding:5px;
}
#addcourse{/*Add Course*/
  background-color: #75df7c;
}
#coursename{/*text input */
  background-color: #ffffff;
  border:1px solid gray;
  border-radius: 5px;
}
</style>
