<template>
  <div id="schedulechooser">
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

<style>
#schedulechooser{
  border: 1px solid red; 
  margin: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  padding:5px;
}</style>
