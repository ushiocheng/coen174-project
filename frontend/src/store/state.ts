// store/state.ts
import { defineStore } from 'pinia';

export const useCourseSelectedStore = defineStore('courseSelected', {
  state: () => {
    return { courseSelected: [] };
  },
  actions: {
    addCourse(courseName: string, potentialSchedule: number) {
      this.courseSelected.push({ courseName, potentialSchedule });
    },
    deleteCourse(index: number) {
      this.courseSelected.splice(index, 1);
    },
  },
});

declare module '@vue/runtime-core' {
  interface Store {
    state: State;
  }
}
