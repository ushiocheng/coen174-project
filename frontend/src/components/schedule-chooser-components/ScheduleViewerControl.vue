<template>
  <div style="border: 1px solid green; margin: 10px">
    <p>ScheduleViewerControl</p>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn @click="() => {}">Prev</v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-btn @click="() => {}">Next</v-btn>
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
