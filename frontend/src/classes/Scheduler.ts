import { expand, compareFn, createSectionsByDay } from "./utility";
import Course from "./Course";
import CARequest from "./CARequest";
import Section from "./Section";

//consider using environmental variables to store port numbers for local host and proxy server
//note: vites is the proxy server
//remember to use docker build then use npm run dev command

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

//should test

export default class Scheduler {
  //list of all classes in the current quarter
  classList: Set<string>;

  //record the name when a user adds a class
  selectedCourseNames: Set<string>;

  //courses that dont have a section
  unScheduledCourses: Set<Course>;

  //make requests to scu
  requester: CARequest;
  maxClasses: number;

  //array of sections that are full capacity
  //this can eventually be integrated into a wait list verison
  //of the schedules list

  //instead of this...
  //each section has a mark to be filled or not
  //after building the list of schedules
  //a check can be made to see if the
  //shedule has a class with zero capacity
  //then it can be added to the list of waitlist shedules
  filledSections: Array<Section>;

  //this may still be useful so it is an intermeidary
  //between the classList and the build schedules functio
  selectedCourses: Map<string, Course>;

  //list of schedules
  scheduleList: Array<Array<Section>>;

  waitListSchedules: Array<Array<Section>>;

  //minimum time in between classes or other activities thet user adds
  buffer: number;
  marked: { startTime: Date; endTime: Date }[][];

  constructor() {
    this.maxClasses = -1;
    this.buffer = 0;
    this.marked = [[], [], [], [], []];
    //a list of class strings
    this.classList = new Set();

    //this is a hash table that maps course string like "COEN 12" to course object
    //this.scheduledCourses = new Map(String, Course);

    //a list of classes that arent scheduled
    this.unScheduledCourses = new Set();

    //this makes requests to the scu course avail
    this.requester = new CARequest();

    this.filledSections = [];

    //the courses the user currently has selected to be part of the schedule
    //this does not include un scheduled courses
    this.selectedCourses = new Map<string, Course>();

    this.selectedCourseNames = new Set();

    //this is an array of all the sections for added courses
    //it can be sorted by starting time regardless of the class name
    //this.allSections = new Array()

    //list of working schedules
    //list of list of sections
    this.scheduleList = new Array();

    this.waitListSchedules = new Array();
  }

  //the start and end time should be
  //starting on 2001-01-01 plus an amount of time
  inputSchedule(day: number, start: Date, end: Date) {
    this.marked[day].push({ startTime: start, endTime: end });
  }

  //the buffer can be used to add half of its time to before the start and after the end of each
  createBuffer(buff: number) {
    this.buffer = buff;
    this.scheduleList = new Array();
    this.waitListSchedules = new Array();
  }

  /** Switches the quarter that will be used for course searches and
   *  schedule generation.
   */
  async changeQuarter(quarter: string) {
    this.requester.setActiveQuarter(quarter);
    this.classList = new Set();
    this.selectedCourses = new Map();
    this.selectedCourseNames = new Set();
    this.scheduleList = new Array();
    this.waitListSchedules = new Array();
    this.filledSections = new Array();
    await this.updateClassList();
    this.selectedCourses.clear();
    this.unScheduledCourses.clear();
  }

  /** Switches the career that will be used for course searches
   * @param career
   * Valid arguments:
   * - "ugrad": undergraduate courses only
   * - "grad":  graduate courses only
   * - "all":   all courses
   */
  async changeCareer(career: string) {
    this.requester.setCareer(career);
    await this.updateClassList();
  }

  async getAllQuarters() {
    return await this.requester.getQuarters();
  }

  async updateClassList() {
    this.classList = new Set();

    //get a list of jsons for each class
    let jsonList = await this.requester.getCourseList();

    //extract the name of the course
    for (let item of jsonList) {
      this.classList.add(item["value"]);
    }
  }

  // This should be called when the page loads
  async preLoad() {
    await this.requester.setQuarterList();
    await this.updateClassList();
  }
  //need to request the classes in this function
  //direct user input
  addCourse(courseString: string): boolean {
    courseString = courseString.toUpperCase();
    console.log(this.selectedCourseNames);
    if (this.selectedCourseNames.has(courseString)) {
      console.log(courseString, " Already added");
      return false;
    } else if (!this.classList.has(courseString)) {
      console.log(courseString, " Not a valid Course");
      return false;
    } else {
      this.selectedCourseNames.add(courseString);
      console.log(courseString, " has been added");
      return true;
    }
  }

  async addSectionsToCourses(courseString: string) {
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
            item["class_nbr"],
            item["mtg_days_1"],
            item["c_hrstart"],
            item["c_mnstart"],
            item["c_duration"],
            item["subject"],
            item["catalog_nbr"],
            item["instr_1"],
            item["seats_text"],
            item["seats_remaining"],
            item["mtg_facility_1"]
          );
          if (item["seats_remaining"] == 0) {
            this.filledSections.push(section);
          }
          courseObj.sections.push(section);
        }
      }
      this.selectedCourses.set(courseString, courseObj);
    }
  }

  /**
   * Removes courseString from list of selected courses
   *
   * @returns - true if the course is in the list and has been removed
   *          - false otherwise
   */
  removeCourse(courseString: string): boolean {
    courseString = courseString.toUpperCase();
    return (
      this.selectedCourses.delete(courseString) &&
      this.selectedCourseNames.delete(courseString)
    );
  }

  clearCourses() {
    this.selectedCourseNames.forEach((name) => {
      this.removeCourse(name);
    });
  }

  chooseNumberOfCLasses(maxClasses: number) {
    if (maxClasses > 0) {
      this.maxClasses = maxClasses;
      console.log("number of classes selected");
    } else {
      console.log("must have more than zero classes!");
    }
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

  //seats_remaining":"27"

  async buildSchedules() {
    this.filledSections = [];
    this.scheduleList = [];
    this.waitListSchedules = [];
    this.selectedCourses = new Map<string, Course>();
    var markedNew = [];

    for (let item of this.marked) {
      markedNew.push(item);
    }

    var classesAdded: Set<string> = new Set();
    var allSections = new Array();

    for (let item of this.selectedCourseNames) {
      await this.addSectionsToCourses(item);
    }

    // console.log("selected courses:", this.selectedCourses);

    this.selectedCourses.forEach((item) => {
      allSections.push(...item.sections);
    });

    allSections.sort(compareFn);

    let sectionsByDay = new Array();

    // console.log("all sections sorted:");
    for (let item of allSections) {
      // console.log(item);
    }
    createSectionsByDay(sectionsByDay, allSections);
    // console.log("sections by day", sectionsByDay);

    //this should be changes to take a maximum number of classes variable
    let NofClasses = 0;
    if (this.maxClasses == -1) {
      NofClasses = this.selectedCourses.size;
    } else {
      NofClasses = this.maxClasses;
    }

    expand(
      this.buffer,
      0,
      markedNew,
      0,
      NofClasses,
      new Date(`2001-01-01 00:00`),
      sectionsByDay,
      classesAdded,
      [],
      this.scheduleList
    );

    for (let lst of this.scheduleList) {
      let available = true;
      for (let item of lst) {
        //why are there negative values for this
        //asusming negative values mean that the class is full
        if (item.remainingSeats <= 0) {
          available = false;
          break;
        }
      }
      if (!available) {
        this.waitListSchedules.push(lst);
      }
    }
  }
}
