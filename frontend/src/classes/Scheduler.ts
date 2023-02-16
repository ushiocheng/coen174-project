import { expand, compareFn, createSectionsByDay } from "./utility";
import Course from "./Course";
import CARequest from "./CARequest";
import Section from "./Section";

//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule
//note: you cant import typescript files into javascript
//https://stackoverflow.com/questions/54410351/import-typescript-file-in-javascript

//potential features:
//minimum time in between classes set as a integer variable
//implmentation: use with the intersection fcuntionality
//add a section of time on a certain day that is off limits
//implementaton: add to marked when building the schedule but save in a list of saved
//off limit times in the structure of an array of size 5 for each day
//

export default class Scheduler {
  classList: Array<string>;
  unScheduledCourses: Set<Course>;
  requester: CARequest;
  selectedCourses: Map<string, Course>;
  scheduleList: Array<Array<Section>>;
  buffer: number;
  marked: {startTime: Date; endTime: Date;}[][];

  constructor() {

    this.buffer = 0
    this.marked = [[],[],[],[],[]]
    //a list of class strings
    this.classList = [];

    //this is a hash table that maps course string like "COEN 12" to course object
    //this.scheduledCourses = new Map(String, Course);

    //a list of classes that arent scheduled
    this.unScheduledCourses = new Set();

    //this makes requests to the scu course avail
    this.requester = new CARequest();

    //the courses the user currently has selected to be part of the schedule
    //this does not include un scheduled courses
    this.selectedCourses = new Map();

    //this is an array of all the sections for added courses
    //it can be sorted by starting time regardless of the class name
    //this.allSections = new Array()

    //list of working schedules
    //list of list of sections
    this.scheduleList = new Array();
  }


  //the start and end time should be
  //starting on 2001-01-01 plus an amount of time
  inputSchedule(day:number, start:Date, end:Date)
  {
    this.marked[day].push({startTime: start, endTime: end})
  }

  //the buffer can be used to add half of its time to before the start and after the end of each
  createBuffer(buff: number)
  {
    this.buffer = buff
  }


  /** Switches the quarter that will be used for course searches and
   *  schedule generation.
   */
  async changeQuarter(quarter: string) {
    this.requester.setActiveQuarter(quarter);
    await this.updateClassList();
  }

  async updateClassList() {
    this.classList = [];

    //get a list of jsons for each class
    let jsonList = await this.requester.getCourseList();

    //extract the name of the course
    for (let item of jsonList) {
      this.classList.push(item["value"]);
    }
  }
  //This should be called when the page loads
  async preLoad() {
    await this.requester.setQuarterList();
    await this.updateClassList();
  }

  //need to request the classes in this function
  //direct user input
  async addCourse(courseString: string): Promise<boolean> {
    //need to check for validity

    //get sections that have the given class name
    if (this.selectedCourses.has(courseString)) {
      console.log("Already added");
      return false;
    } else if (!this.classList.includes(courseString)) {
      console.log("Not a valid Course");
      return false;
    } else {
      let courseSections = await this.requester.getSearchResults(courseString);
      // console.log(courseSections);
      let pair: Array<string> = [];
      pair = courseString.split(" ", 2);
      //if the class has no schedule
      if (courseSections[0]["c_hrstart"] == "" && courseSections.length == 1) {
        //if class is unscheduled
        let courseObj = new Course(pair[0], pair[1]);
        this.unScheduledCourses.add(courseObj);
      } else {
        let courseObj = new Course(pair[0], pair[1]);
        let item: any;

        // console.log(courseString, courseSections);

        for (item of courseSections) {
          if (item["c_duration"] != "") {
            let section = new Section(
              courseObj,
              item["class_nbr"],
              item["mtg_days_1"],
              item["c_hrstart"],
              item["c_mnstart"],
              item["c_duration"],
              item["subject"],
              item["catalog_nbr"]
            );
            courseObj.sections.push(section);
          }
        }
        this.selectedCourses.set(courseString, courseObj);
      }
      // console.log("course added");
      return true;
    }
  }

  /**
   * Removes courseString from list of selected courses
   *
   * @returns - true if the course is in the list and has been removed
   *          - false otherwise
   */
  removeCourse(courseString: string): boolean {
    return this.selectedCourses.delete(courseString);
  }

  // filterScheduled()
  // {
  //     this.unScheduled = this.jsonList.filter(function (el)
  //     {
  //       return (el["mtg_time_beg_1"] !='')
  //     });

  //     this.jsonList = this.jsonList.filter(function (el)
  //     {
  //       return (el["mtg_time_beg_1"] =='')
  //     });
  // }

  /** Generates all possible schedules based on courses in selectedCourses.
   *  - Stored results in scheduleList
   */
  buildSchedules() {
    var markedNew = this.marked;
    var classesAdded: Set<string> = new Set();
    var allSections = new Array();

    // console.log("selected courses:", this.selectedCourses);

    this.selectedCourses.forEach((item) => {
      allSections.push(...item.sections);
    });

    allSections.sort(compareFn);

    var sectionsByDay = new Array();

    // console.log("all sections sorted:");
    for (let item of allSections) {
      // console.log(item);
    }
    createSectionsByDay(sectionsByDay, allSections);
    // console.log("sections by day", sectionsByDay);
    expand(this.buffer,
      0,
      markedNew,
      0,
      this.selectedCourses.size,
      new Date(`2001-01-01 00:00`),
      sectionsByDay,
      classesAdded,
      [],
      this.scheduleList
    );
  }
}
