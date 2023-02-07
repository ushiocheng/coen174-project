/*  Course Avail Request object */

/*  FUNCTIONS
    setActiveQuarter(quarter)       changes which quarter will be used for queries
                                    (valid params: "Fall 2021", "Summer 2022", etc.)
    async getSearchResults(query)   returns a list of all the section that match the query
    async getCourseList()           returns a list of all courses being offered (use this 
                                    to autofill the user's input 
    async getQuarters()             returns a list of all quarters and their id's
*/

/*  DEMO
    When the page loads, create a CARequest object.
        > let req = new CARequest("Fall 2022");
    This may take a bit so wait about 1 second before
    Using any further functions
        > req.getSearchResults("COEN 12").then((results) => {
            console.log(results);
          });
        > req.setActiveQuarter("Spring 2023");
*/

export default class CARequest {
  activeQuarter: string;
  activeQuarterID: number = 4420; // Bad but I needed to initialize it
  quarterList: any;

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

    return quarters.results.indb;
  }

  setActiveQuarter(quarter: string) {
    this.quarterList.forEach((pair: any) => {
      if (pair.label == quarter) {
        this.activeQuarter = quarter;
        this.activeQuarterID = pair.value;
      }
    });
    this.activeQuarterID = this.activeQuarterID || this.quarterList[0].value;
  }

  async getSearchResults(query: string) {
    let response = await fetch(
      `/courseavail/search/${this.activeQuarterID}/ugrad/${query}`
    );
    let queryMatches = await response.json();

    return queryMatches;
  }

  async getCourseList() {
    let response = await fetch(
      `/courseavail/autocomplete/${this.activeQuarterID}/ugrad/courses`
    );
    let allCourses = response.json();

    return allCourses;
  }
}
