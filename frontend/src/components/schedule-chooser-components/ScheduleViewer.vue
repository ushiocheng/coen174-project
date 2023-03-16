<template>
  <div style="border: 1px solid green; margin: 10px">
    <p>ScheduleViewer</p>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn @click="() => $emit('generateSchedules')"
            >Generate Schedules</v-btn
          >
          <!-- also has to add all the courses to profile obj -->
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
  },
};
</script>

<style></style>
