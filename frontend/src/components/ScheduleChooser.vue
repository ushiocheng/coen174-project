<template>
  <div id="schedulechooser">
    <!-- <p>component/ScheduleChooser</p> -->
    <schedule-viewer
      :profiles="profiles"
      :validSchedules="validSchedules"
      :index="index"
    />
    <schedule-viewer-control
      :profiles="profiles"
      :index="index"
      @generateSchedules="
        () => {
          index = 0;
          $emit('generateSchedules');
        }
      "
      @increment="
        () => {
          if (index + 1 < validSchedules.length) index++;
        }
      "
      @decrement="
        () => {
          if (index > 0) index--;
        }
      "
    />
  </div>
</template>

<script lang="ts">
import ScheduleViewer from "./schedule-chooser-components/ScheduleViewer.vue";
import ScheduleViewerControl from "./schedule-chooser-components/ScheduleViewerControl.vue";

import ProfileSwitcher from "@/classes/ProfileSwitcher";
import Section from "@/classes/Section";

export default {
  components: { ScheduleViewer, ScheduleViewerControl },
  props: {
    profiles: {
      type: ProfileSwitcher,
      required: true,
    },
    validSchedules: {
      type: Array<Array<Section>>,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
    };
  },
};
</script>

<style>
#schedulechooser {
  margin: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5px;
}
</style>
