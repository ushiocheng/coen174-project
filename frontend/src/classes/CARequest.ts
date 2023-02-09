/*  Course Avail Request object */

/*  FUNCTIONS
    setActiveQuarter(quarter)       changes which quarter will be used for queries
                                    (valid params: "Fall 2021", "Summer 2022", etc.)
    async getSearchResults(query)   returns a list of all the section that match the query,
                                    or an empty array if it failed
    async getCourseList()           returns a list of all courses being offered, or an 
                                    empty array if it failed (use this to autofill the user's input)
    async getQuarters()             returns a list of all quarters and their id's, or an 
                                    empty array if it failed
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
  activeQuarter: string; // The quarter used for any future searches
  activeQuarterID: number = 4420; // The ID of the quarter, for part of the fetch request
  quarterList: Array<any> = []; // Cache the list of {activeQuarter, activeQuarterID} pairs from courseavail

  constructor(quarter = "default") {
    this.activeQuarter = quarter;
    this.getQuarters().then((quarterList) => {
      this.quarterList = quarterList;
      this.setActiveQuarter(this.activeQuarter);
    });
  }

  async getQuarters(): Promise<Array<{ value: string; label: string }>> {
    // Check if the value is cached first
    if (this.quarterList.length > 0) {
      return this.quarterList;
    }

    type CAQuarterList = {
      title: string;
      results: {
        currdef: Object;
        indb: Array<{ value: string; label: string }>;
      };
    };

    // If it is not cached, retrieve from courseavail
    try {
      let response = await fetch("/courseavail/autocomplete/quarters/");
      let quarters = (await response.json()) as CAQuarterList;
      return quarters.results.indb;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  setActiveQuarter(quarter: string) {
    // Compare param to value-label pairs in cached list of quarters
    this.quarterList.forEach((pair: any) => {
      if (pair.label == quarter) {
        this.activeQuarter = quarter;
        this.activeQuarterID = pair.value;
      }
    });
    this.activeQuarterID = this.activeQuarterID || this.quarterList[0].value;
  }

  async getSearchResults(query: string): Promise<Array<any>> {
    // Request query results from courseavail
    try {
      let response = await fetch(
        `/courseavail/search/${this.activeQuarterID}/ugrad/${query}`
      );
      let queryMatches = await response.json();
      return queryMatches.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getCourseList(): Promise<
    Array<{
      value: string;
      label: string;
      subject: string;
      s: string;
      d: string;
    }>
  > {
    // Request all coursed being offered for the quarter from courseavail
    try {
      let response = await fetch(
        `/courseavail/autocomplete/${this.activeQuarterID}/ugrad/courses`
      );
      let allCourses = await response.json();
      return allCourses.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
