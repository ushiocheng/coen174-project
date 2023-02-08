
import {expand, compareFn, createClassesByDay} from './utility.js';
import {Course} from './Course.ts';
import {CARequest} from './CARequest.ts';
import {Section} from "./Section.ts"

//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule

class Scheduler{

    constructor(){

      //both of these are loaded complete when the page loads
      this.jsonList = []
      //this is a hash table that maps course string (coen 12) to course object
      this.scheduledCourses = new Map(String, Course);

      //a list of classes that arent scheduled
      this.unScheduledCourses  = new Set()

      //this makes requests to the scu course avail
      this.requester  = new CARequest()

      //the courses the user currently has selected to be part of the schedule
      //this does not include un scheduled courses
      this.selectedCourses = new Set(Course)

      //this is an array of all the sections for added courses
      //it can be sorted by starting time regardless of the class name
      //this.allSections = new Array()

   
      //list of working schedules
      this.scheduleList = new Array()
    }


    

    //change the active quarter
    changeQuarter(quarterId)
    {
      this.requester.setActiveQuarter(quarterId)
    }


    //This should be called when the page loads
    preLoad()
    {
        let resp = this.requester.getCourseList()

        var classesList = resp["results"]
    
        for(let course in classesList)
        {
            let courseSections  = this.requester.getSearchResults(course["value"])["results"]
            //check if its scheduled or not

            let pair = course["value"].split(" ")

            
            if(courseSections[0]["c_hrstart"]=="")
            {
              //if class is unscheduled
              let courseObj = new Course(pair[0], pair[1])
              this.unScheduledCourses.add(courseObj)
            }
            else
            {
              //if class is scheduled
              this.jsonList.push(...courseSections)
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

              this.scheduledCourses.set(course["value"], courseObj)
            }
        }
    }

    //direct user input
    addCourse(courseString)
    {
      //need to check for validity
      if(this.scheduledCourses.has(courseString))
      {
        this.selectedCourses.add(this.scheduledCourses[courseString])
      }
      else
      {
        return "course not found"
      }
    }

    //direct user input
    removeCourse(courseString)
    {
      //need to check for validity
      if(this.scheduledCourses.has(courseString))
      {
        this.selectedCourses.delete(this.scheduledCourses[courseString])
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

    for(let item of this.selectedCourses)  
    {
      allSections.add(...item.sections)
    }

    allSections.sort(compareFn)

    var classesByDay = new Array()
    createClassesByDay(classesByDay, allSections)
    

    expand(0, marked, 0, this.selectedCourses.size, 0, classesByDay,classesAdded, [],this.scheduleList);

  }

}

