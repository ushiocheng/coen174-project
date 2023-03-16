<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>component/ScheduleChooser</p>
    <schedule-viewer
      :profiles="profiles"
      @generateSchedules="() => $emit('generateSchedules')"
    />
    <schedule-viewer-control :profiles="profiles" />
  </div>
</template>

<script lang="ts">
import ScheduleViewer from "./schedule-chooser-components/ScheduleViewer.vue";
import ScheduleViewerControl from "./schedule-chooser-components/ScheduleViewerControl.vue";

import ProfileSwitcher from "@/classes/ProfileSwitcher";

export default {
  components: { ScheduleViewer, ScheduleViewerControl },
  props: {
    profiles: {
      type: ProfileSwitcher,
      required: true,
    },
  },
};
</script>

<style></style>
