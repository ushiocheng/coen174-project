<template>
  <div style="margin: 10px">
    <!-- <p>ScheduleViewerControl</p> -->
    <v-container>
      <v-row v-if="validSchedules.length > 0">
        <v-col cols="8" sm="8" md="8"></v-col>
        <v-col cols="12" sm="12" md="12"
          >{{ index + 1 }}/{{ validSchedules.length }}</v-col
        >
      </v-row>
      <v-row>
        <v-col cols="8" sm="6" md="1">
          <v-btn @click="() => $emit('decrement')">Prev</v-btn>
        </v-col>
        <v-col cols="8" sm="6" md="2">
          <v-btn @click="() => $emit('generateSchedules')"
            >Generate Schedules</v-btn
          >
        </v-col>
        <v-col cols="8" sm="6" md="1">
          <v-btn @click="() => $emit('increment')">Next</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import ProfileSwitcher from "@/classes/ProfileSwitcher";

export default {
  props: {
    profiles: {
      type: ProfileSwitcher,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    validSchedules: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
