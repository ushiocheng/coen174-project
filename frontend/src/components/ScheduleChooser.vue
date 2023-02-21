<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>component/ScheduleChooser</p>
    <schedule-viewer />
    <schedule-viewer-control />
  </div>
</template>

<script lang="ts">
import ScheduleViewer from "./schedule-chooser-components/ScheduleViewer.vue";
import ScheduleViewerControl from "./schedule-chooser-components/ScheduleViewerControl.vue";
export default {
  components: { ScheduleViewer, ScheduleViewerControl },
};
</script>

<style></style>
