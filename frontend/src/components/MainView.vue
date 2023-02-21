<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>Main View</p>
    <editor />
    <schedule-chooser />
  </div>
</template>

<script lang="ts">
import Editor from "@/components/Editor.vue";
import ScheduleChooser from "@/components/ScheduleChooser.vue";
export default {
  components: { Editor, ScheduleChooser },
};
</script>

<style></style>
