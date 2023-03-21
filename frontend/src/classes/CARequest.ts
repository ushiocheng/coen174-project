/*  Course Avail Request object */

const G_FRONTEND_PROXY_URL_BASE = "/courseavail";
const G_COURSEAVAIL_URL_BASE = "https://www.scu.edu/apps/ws/courseavail";

const fetchCourseAvail = async (relativeURL: string): Promise<any> => {
  if (!relativeURL.startsWith("/")) {
    console.error(
      "[WARN] fetchCourseAvail() called with incorrect parameter format."
    );
    relativeURL = `/${relativeURL}`;
  }
  try {
    let response = await fetch(`${G_FRONTEND_PROXY_URL_BASE}${relativeURL}`);
    return await response.json();
  } catch (error) {
    /* Try courseavail url */
    // console.error(error);
    // return [];
    let response = await fetch(`${G_COURSEAVAIL_URL_BASE}${relativeURL}`);
    return await response.json();
  }
  // Otherwise fail explicitly
  // todo: alert
  return {};
};

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
  activeQuarter: string = ""; // The quarter used for any future searches
  activeQuarterID: number = 4440; // The ID of the quarter, for part of the fetch request
  quarterList: Array<any> = []; // Cache the list of {activeQuarter, activeQuarterID} pairs from courseavail
  career: string;

  /** Default quarter is Fall 2021 */
  constructor() {
    this.career = "ugrad";
    // this.getQuarters().then((quarterList) => {
    //   //resets the quarterList
    //   //and sets the active quarter
    //   this.quarterList = quarterList;
    //   this.setActiveQuarter(this.activeQuarter);
    // });
  }

  // Part of initialization, called from Scheduler.preLoad()
  async setQuarterList() {
    let quarterList = await this.getQuarters();
    //resets the quarterList
    this.quarterList = quarterList;
    //sets the active quarter
    this.setActiveQuarter("default");
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
    const response = await fetchCourseAvail("/autocomplete/quarters/");
    let quarters = response as CAQuarterList;
    // console.log("Quarters:", quarters.results.indb);
    return quarters.results.indb;
  }

  setActiveQuarter(quarter: string) {
    // Compare param to value-label pairs in cached list of quarters
    this.quarterList.forEach((pair: any) => {
      if (pair.label == quarter) {
        this.activeQuarter = quarter;
        this.activeQuarterID = pair.value;
      }
    });
    //sets the active quarter ID to the first if there were no matches
    this.activeQuarterID = this.activeQuarterID || this.quarterList[0].value;
    this.activeQuarter = this.activeQuarter || this.quarterList[0].label;
  }

  setCareer(career: string): boolean {
    let validCareers = ["ugrad", "grad", "all"];
    if (validCareers.includes(career)) {
      this.career = career;
      return true;
    }
    return false;
  }

  async getSearchResults(query: string): Promise<
    Array<{
      term: string;
      strm_descr: string;
      subject: string;
      subject_descr: string;
      catalog_nbr: string;
      class_nbr: string;
      class_descr: string;
      mtg_days_1: string;
      mtg_time_beg_hr_1: string;
      mtg_time_beg_1: string;
      mtg_time_end_1: string;
      ctype: string;
      mtg_facility_1: string;
      instr_1: string;
      instr_2: string;
      instr_3: string;
      mtg_days_2: string;
      mtg_time_beg_2: string;
      mtg_time_end_2: string;
      mtg_facility_2: string;
      seats_remaining: string;
      topic: string;
      units_minimum: string;
      units_maximum: string;
      session: string;
      loc_id: string;
      lat: string;
      long: string;
      l_cname: string;
      l_img: string;
      l_name: string;
      l_flr: string;
      l_flcid: string;
      strm_abbr: string;
      instr_1_sh: string;
      instr_2_sh: string;
      time1_fr: string;
      c_hrstart: string;
      c_mnstart: string;
      c_duration: number;
      c_hrstart2: string;
      c_mnstart2: string;
      c_duration2: string;
      time2_fr: string;
      seats_text: string;
      has_seats: number;
    }>
  > {
    // Request query results from courseavail
    const response = await fetchCourseAvail(
      `/search/${this.activeQuarterID}/${this.career}/${query}`
    );
    let queryMatches = response;
    return queryMatches.results;
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

    let response = await fetchCourseAvail(
      `/autocomplete/${this.activeQuarterID}/${this.career}/courses`
    );
    let allCourses = response;
    // console.log("response:", allCourses);
    return allCourses.results;
  }

  async getSectionInfo(sectionID: string): Promise<any> {
    return (
      await fetchCourseAvail(
        `/details/${this.activeQuarterID}/${this.career}/${sectionID}`
      )
    ).results[0];
  }
}
