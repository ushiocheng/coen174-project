<template>
  <div style="margin: 10px">
    <!-- <p>ScheduleViewer</p> -->
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <ul>
            <li v-for="course in currentSchedule">
              {{ course }}
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import ProfileSwitcher from "@/classes/ProfileSwitcher";
import Section from "@/classes/Section";

export default {
  props: {
    profiles: {
      type: ProfileSwitcher,
      required: true,
    },
    validSchedules: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    currentSchedule(): any[] {
      let list = [] as any[];
      this.validSchedules[this.index]?.forEach((section: Section) => {
        let display: string = "";
        display += `${section.subject} ${section.catalog_nbr} `;
        display += `(${section.sectionID}): `;
        try {
          display += `${section.startTime.toLocaleTimeString()} - `;
        } catch (err) {}
        try {
          display += `${section.endTime.toLocaleTimeString()} `;
        } catch (err) {}
        display += `${section.haveClassIn["M"] ? "M" : ""}`;
        display += `${section.haveClassIn["T"] ? "T" : ""}`;
        display += `${section.haveClassIn["W"] ? "W" : ""}`;
        display += `${section.haveClassIn["R"] ? "R" : ""}`;
        display += `${section.haveClassIn["F"] ? "F" : ""} `;
        display += `${section.location}, `;
        display += `${section.professor}\n`;
        list.push(display);
      });

      return list;
    },
  },
  watch: {
    index(newIndex, oldIndex) {
      this.$forceUpdate();
      console.log(this.index);
    },
  },
};
</script>

<style></style>
