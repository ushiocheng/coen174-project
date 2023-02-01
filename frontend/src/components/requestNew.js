/* When the page loads, create a CARequest object */

/*  setActiveQuarter(quarter)   changes which quarter will be used for queries
                                (valid params: "Fall 2021", "Summer 2022", etc.)
    getSearchResults(query)     returns a list of all the section that match the query
    getCourseList()             returns a list of all courses being offered (use this 
                                to autofill the user's input 
    getQuarters()               returns a list of all quarters and their id's
*/

export default class CARequest {
  constructor(quarter = "default") {
    this.activeQuarter = quarter;
    this.getQuarters().then((quarterList) => {
      this.quarterList = quarterList;
      this.setActiveQuarter(this.activeQuarter);
    });
  }

  async getQuarters() {
    let response = await fetch("/courseavail/autocomplete/quarters/");
    let quarters = await response.json();

    return quarters;
  }

  async setActiveQuarter(quarter) {
    console.log(this.activeQuarter);
    console.log(this.quarterList);
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
}
