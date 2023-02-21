<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>component/Editor.vue</p>
    <courses-editor />
    <rules-editor />
  </div>
</template>

<script lang="ts">
import CoursesEditor from "@/components/editor-components/CoursesEditor.vue";
import RulesEditor from "./editor-components/RulesEditor.vue";
export default {
  components: { CoursesEditor, RulesEditor },
};
</script>

<style></style>
