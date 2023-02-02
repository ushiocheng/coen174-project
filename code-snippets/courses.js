
import {data} from './courseInformation.mjs'
import {expand, compareFn, createClassesByDay} from './utility.js'

//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule

class Course{

    constructor(rawJSON){
      //the data only needs to be set once as a json with results
      //then it can be used to populate scheduled and unScheduled
      this.data = rawJSON

      //every json entry is stored in one of the following
      this.scheduled  = []
      this.unScheduled = []


      //a user enters a class name and number
      //then the entire json data for all scheduled classes with that name and number are added
      //to these


      this.chosenScheduled = new Set()
      this.chosenUnScheduled = new Set()

      //keeps track of the unqiue course names
      this.unique = new Set()

      //four simple things
      //(subject+" "+catalog), (start time), (end time), and (days)
      this.classList = []
      //the list of working schedules produced by build schedules
      this.scheduleList = []
    }
  
    //all that seems to matter is data["results"]
    //does this mean that data should be set to raw["results"] ???
    popScheduled(){ 
        this.scheduled = this.data["results"].filter(function (el)
        {
          return el["mtg_time_beg_1"] !='' 
        });
    }
  
    popUnSchedudled(){
        this.unScheduled = this.data["results"].filter(function (el)
        {
          return el["mtg_time_beg_1"] =='' 
        });
    }
  

    //the format for a class that is passed here must be "subject"+" "+"catalog_nbr"
    //otherwise no matches will be returned
    //all the different classes with a unique class_nbr should be added

    selectChosen(Class)
    {
        var pair = Class.split(" ")

        this.unique.add(Class)

        if(pair.length == 1)
        {
            return "No Matches"
        }


        let a = this.scheduled.filter(function (el)
        {
          return (el["subject"] == pair[0] && el["catalog_nbr"] == pair[1])
        }); 
        a.forEach(item => this.chosenScheduled.add(item))



        let b = this.unScheduled.filter(function (el)
        {
            return (el["subject"] == pair[0] && el["catalog_nbr"] == pair[1]) 
        });
        b.forEach(item => this.chosenUnScheduled.add(item))


        if(a.length == 0 && b.length ==  0)
        {
            return "No Matches"
        }

        console.log(this.chosenScheduled)
    }


    scrubScheduledClasses()
    {
        for (var item of Array.from(this.chosenScheduled))
        {
            //[hour, min]:
            let startTime = 
            [parseInt(item["c_hrstart"]) , parseInt(item["c_mnstart"])]
        
            let endTime = 
            [startTime[0]+ parseInt((parseInt(item["c_duration"])+startTime[1])/60), (startTime[1]+parseInt(item["c_duration"]))%60.0]
            
            this.classList.push([item["subject"]+" "+item["catalog_nbr"], startTime, endTime, item["mtg_days_1"]])
        }

  

    // buildSchedules(){
    //     //use filtered data with scrubScheduledClasses()
    //     //implement filterTestV2.js
    // }

  }



  popClassesByDay()
  {
    this.classesByDay
  }

  buildSchedules()
  {
    
    var marked = [[],[],[],[],[]]
    var classesAdded = new Set()

    this.classList.sort(compareFn)
    var classesByDay = []
    
    createClassesByDay(classesByDay, this.classList)
    
    //to avoid making the same schedule with a different order

    expand(0, marked, 0, this.unique.size, 0, classesByDay,classesAdded, [],this.scheduleList);

  }

//read and set the json varaible from the course infomration.mjs
//select a few chosen classes

}

var courseData = new Course(data)
courseData.popScheduled()
courseData.selectChosen("ACTG 131")
console.log(courseData.unique)
courseData.selectChosen("ACTG 136")
courseData.selectChosen("AMTH 106")
courseData.selectChosen("AMTH 108")

courseData.scrubScheduledClasses()
courseData.buildSchedules()


//classes that are scheduled and part of the
//console.log(courses.chosenScheduled)



//unqiue classes names that the student wants (no specific times)
//changed when calling select chosen

// //all jsons for all class times for all class names the user wants
console.log(courseData.chosenScheduled)
// // //all the class time that have a name from chosenScheduled
console.log(courseData.classList)
// // //all the cobinations of wokring schedules


for(let item of courseData.scheduleList)
{
    console.log(item)
}


//to do: fetch from experimental branch and settle merge conflicts if need be
//chen will write the parser so tests can be run
//test the fetch api