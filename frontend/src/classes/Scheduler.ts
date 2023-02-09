import { expand, compareFn, createSectionsByDay } from "./utility";
import Course from "./Course";
import CARequest from "./CARequest";
import Section from "./Section";
import { connect } from "http2";

//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule
//note: you cant import typescript files into javascript
//https://stackoverflow.com/questions/54410351/import-typescript-file-in-javascript

export default class Scheduler {
  classList: Array<string>;
  unScheduledCourses: Set<Course>;
  requester: CARequest;
  selectedCourses: Map<string, Course>;
  scheduleList: Array<Array<Section>>;

  constructor() {
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

  //change the active quarter
  changeQuarter(quarterId: string) {
    this.requester.setActiveQuarter(quarterId);
  }

  //This should be called when the page loads
  async preLoad() {
    //get a list of jsons for each class
    let jsonList = await this.requester.getCourseList();

    //extract the name of the course
    for (let item of jsonList) {
      this.classList.push(item["value"]);
    }
  }

  //need to request the classes in this function
  //direct user input
  async addCourse(courseString: string) {
    //need to check for validity

    //get sections that have the given class name
    if (this.selectedCourses.has(courseString)) {
      return "Already added";
    } else if (!this.classList.includes(courseString)) {
      return "Not a valid Course";
    } else {
      console.log(courseString);
      let courseSections = await this.requester.getSearchResults(
        courseString.slice()
      );
      console.log(courseString);
      let pair: Array<string> = [];
      try {
        pair = courseString.split(" ");
      } catch (error) {
        console.log(error);
      }
      console.log(pair);
      //if the class has no schedule
      if (courseSections[0]["c_hrstart"] == "" && courseSections.length === 1) {
        //if class is unscheduled
        let courseObj = new Course(pair[0], pair[1]);
        this.unScheduledCourses.add(courseObj);
      } else {
        console.log("created objs");
        let courseObj = new Course(pair[0], pair[1]);
        let item: any;
        for (item in courseSections) {
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
        console.log("done");
        this.selectedCourses.set(courseString, courseObj);
      }
    }
  }

  //direct user input
  removeCourse(courseString: string) {
    //need to check for validity

    if (this.selectedCourses.has(courseString)) {
      this.selectedCourses.delete(courseString);
    } else {
      return "course not found";
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

  buildSchedules() {
    var marked = [[], [], [], [], []];
    var classesAdded: Set<string> = new Set();
    var allSections = new Array();

    this.selectedCourses.forEach((item) => {
      allSections.push(...item.sections);
    });

    allSections.sort(compareFn);

    var sectionsByDay = new Array();
    createSectionsByDay(sectionsByDay, allSections);

    expand(
      0,
      marked,
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
