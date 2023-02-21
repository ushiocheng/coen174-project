<template>
  <schedule-viewer />
  <schedule-viewer-control />
</template>

<script lang="ts">
import ScheduleViewer from "./schedule-chooser-components/ScheduleViewer.vue";
import ScheduleViewerControl from "./schedule-chooser-components/ScheduleViewerControl.vue";
export default {
  components: { ScheduleViewer, ScheduleViewerControl },
};
</script>

<style></style>
