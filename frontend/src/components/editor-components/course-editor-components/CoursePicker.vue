<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>CoursesEditor/CoursePicker</p>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Course Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-btn @click="console.log('[WARN] add course not implemented.')"
            >Add Course</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CoursePicker",
  setup() {},
});
</script>

<style></style>
