<template>
  <div style="border: 1px solid blue; margin: 10px">
    <p>component/Editor.vue</p>
    <courses-editor :profiles="profiles" :courses="courses" />
    <rules-editor />
  </div>
</template>

<script lang="ts">
import CoursesEditor from "@/components/editor-components/CoursesEditor.vue";
import RulesEditor from "./editor-components/RulesEditor.vue";

import ProfileSwitcher from "@/classes/ProfileSwitcher";
import Course from "@/classes/Course";

export default {
  components: { CoursesEditor, RulesEditor },
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
};
</script>

<style></style>
