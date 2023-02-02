<template>
  <courses-editor />
  <rules-editor />
</template>

<script>
import CoursesEditor from "@/components/editor-components/CoursesEditor.vue";
import RulesEditor from "./editor-components/RulesEditor.vue";
export default {
  components: { CoursesEditor, RulesEditor },
};
</script>

<style></style>
