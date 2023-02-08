
import {expand, compareFn, createSectionsByDay} from './utility.js';
import {Course} from './Course.ts';
import {CARequest} from './CARequest.ts';
import {Section} from "./Section.ts"

//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule
//note: you cant import typescript files into javascript
//https://stackoverflow.com/questions/54410351/import-typescript-file-in-javascript


class Scheduler{

    constructor(){

      //a list of class strings
      this.classList = []

      //this is a hash table that maps course string like "COEN 12" to course object
      //this.scheduledCourses = new Map(String, Course);

      //a list of classes that arent scheduled
      this.unScheduledCourses  = new Set()

      //this makes requests to the scu course avail
      this.requester  = new CARequest()

      //the courses the user currently has selected to be part of the schedule
      //this does not include un scheduled courses
      this.selectedCourses = new map(String, Course)

      //this is an array of all the sections for added courses
      //it can be sorted by starting time regardless of the class name
      //this.allSections = new Array()

   
      //list of working schedules 
      //list of list of sections
      this.scheduleList = new Array()
    }


    

    //change the active quarter
    changeQuarter(quarterId)
    {
      this.requester.setActiveQuarter(quarterId)
    }


    //This should be called when the page loads
    async preLoad()
    {
        //get a list of jsons for each class
        let jsonList = await this.requester.getCourseList()

        //extract the name of the course
        for(item of jsonList){
          classList.add(item["value"])
        }
    }

    //need to request the classes in this function
    //direct user input
    async addCourse(courseString)
    {
      //need to check for validity

      //get sections that have the given class name
      if(this.selectedCourses.has(courseString))
      {
        return "Already added"
      }
      else if(!courseString in this.classList)
      {
        return "Not a valid Course"
      }
      else
      {
        let courseSections  = await this.requester.getSearchResults(courseString)
        //if the class has no schedule
        if(courseSections[0]["c_hrstart"]=="")
        {
          //if class is unscheduled
          let courseObj = new Course(pair[0], pair[1])
          this.unScheduledCourses.add(courseObj)
        }
        else
        {
          let courseObj = new Course(pair[0], pair[1])

          for(let item in courseSections)
          {
            let section  = new Section(
            item["subject"],
            item["class_nbr"],
            item["mtg_days_1"],
            item["c_hrstart"],
            item["c_mnstart"],
            item["c_duration"])
            courseObj.sections.push(section)
          }

          this.selectedCourses.set(courseString,courseObj)
        }
      }   
    }





    

    //direct user input
    removeCourse(courseString)
    {
      //need to check for validity




      if(this.selectedCourses.has(courseString))
      {
        this.selectedCourses.delete(courseString)
      }
      else
      {
        return "course not found"
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



  buildSchedules()
  {
    
    var marked = [[],[],[],[],[]]
    var classesAdded = new Set()
    var allSections = new Array()

    for(let key of this.selectedCourses.keys())  
    {
      allSections.add(...this.selectedCourses[key].sections)
    }

    allSections.sort(compareFn)

    var sectionsByDay = new Array()
    createSectionsByDay(sectionsByDay, allSections)
    

    expand(0, marked, 0, this.selectedCourses.size, 0, sectionsByDay,classesAdded, [],this.scheduleList);

  }

}


