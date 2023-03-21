<template>
  <div style="border: 1px solid red; margin: 10px">
    <p>QuarterSelector</p>
    <v-container>
      <v-select
        label="Select Quarter"
        v-model="activeQuarter"
        :items="allQuarters"
      ></v-select>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileSwitcher from "@/classes/ProfileSwitcher";

export default defineComponent({
  name: "CourseQuarterSelector",
  props: {
    profiles: {
      type: ProfileSwitcher,
      required: true,
    },
  },
  data() {
    return {
      activeQuarter: this.profiles.activeProfile.requester.activeQuarter,
      allQuarters: [] as string[],
    };
  },
  setup() {},
  watch: {
    activeQuarter() {
      this.profiles.changeQuarter(this.activeQuarter);
    },
  },
  computed: {
    async allQuarters(): Promise<Array<any>> {
      return await this.profiles.getQuarters();
    },
  },
});
</script>

<style></style>
