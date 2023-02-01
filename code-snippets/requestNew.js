// Load-> get quarter info and default to most recent one
// When user changes, update quarter id, retrieve all courses for the quarter
// When user enters course title, match it to one of the existing courses
export default {
  name: "CARequest",
  props: class CARequest {
    constructor(quarter = "default") {
      this.activeQuarter = quarter;
      this.quarterList = this.getQuarters().then(() => {
        this.setActiveQuarter(this.activeQuarter);
      });
    }

    async getQuarters() {
      let response = await fetch("/courseavail/autocomplete/quarters/");
      let quarters = await response.json();

      return quarters;
    }

    async setActiveQuarter(quarter) {
      this.quarterList.results.indb.forEach((pair) => {
        if (pair.label == quarter) {
          this.activeQuarter = quarter;
          this.activeQuarterID = pair.value;
        }
      });
      // this.activeQuarterID = this.activeQuarterID || quartersList.results.indb[0].value;
    }

    /* Returns a list of all the sections that match the query */
    async getSearchResults(query) {
      let response = await fetch(`/courseavail/search/${this.activeQuarterID}/ugrad/${query}`);
      let queryMatches = await response.json();

      return queryMatches;
    }

    /*  Returns a list of the quarters and their courseavail ids
      Use this function to populate the quarter selection dropdown menu */
    async getCourseList() {
      let response = await fetch(`/courseavail/autocomplete/${this.activeQuarterID}/ugrad/courses`);
      let allCourses = response.json();

      return allCourses;
    }
  },
};

// window.onload = () => {
//   getQuarters().then((quartersList) => {
//     console.log(quartersList);
//     setActiveQuarter("Winter 2023", quartersList);

//     getCourseList(4420).then((allCourses) => {
//       console.log(allCourses);
//     });

//     getSearchResults(4420, "Math 11").then((queryMatches) => {
//       console.log(queryMatches);
//     });
//   });
// };
