
//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule

class classes{

    constructor(rawJSON){
      //the data only needs to be set once as a json with results
      //then it can be used to populate scheduled and unScheduled
      this.data = rawJSON
      //every json entry is stored in one of the following
      this.scheduled  = []
      this.unScheduled = []


      //josn data entries for all the classes added
      //these are sets in case the user...
      //adds the same class 2 or more times
      this.chosenScheduled = new Set()
      this.chosenUnScheduled = new Set()

      //four simple things
      //(subject+" "+catalog), (start time), (end time), and (days)
      this.scheduleList = []
    }
  
    //all that seems to matter is data["results"]
    //does this mean that data should be set to raw["results"] ???
    popScheduled(){ 
        this.scheduled = data["results"].filter(function (el)
        {
          return el["mtg_time_beg_1"] !='' 
        });
    }
  
    popUnSchedudled(){
        this.unScheduled = data["results"].filter(function (el)
        {
          return el["mtg_time_beg_1"] =='' 
        });
    }
  

    //the format for a class that is passed here must be "subject"+" "+"catalog_nbr"
    //otherwise no matches will be returned
    //all the different classes with a unique class_nbr should be added

    selectChosen(Class)
    {
        pair = Class.split(" ")
        if(pair.length == 1)
        {
            return "No Matches"
        }


        a = this.scheduled.filter(function (el)
        {
          return (el["subject"] == pair[0] && el["catalog_nbr"] == pair[1])
        }); 
        a.forEach(item => this.chosenScheduled.add(item))



        b = this.unScheduled.filter(function (el)
        {
            return (el["subject"] == pair[0] && el["catalog_nbr"] == pair[1]) 
        });
        b.forEach(item => this.chosenUnScheduled.add(item))


        if(a.length == 0 && b.length ==  0)
        {
            return "No Matches"
        }
    }


    scrubScheduledClasses()
    {
        for (var item of Array.from(this.scheduled))
        {
            //[hour, min]:
            let startTime = 
            [parseInt(item["c_hrstart"]) , parseInt(item["c_mnstart"])]
        
            let endTime = 
            [startTime[0]+ parseInt((parseInt(item["c_duration"])+startTime[1])/60), (startTime[1]+parseInt(item["c_duration"]))%60.0]
            
            this.scheduleList.push([item["subject"]+" "+item["catalog_nbr"], startTime, endTime, item["mtg_days_1"]])
        }
    }

  

    buildSchedules(){
        //use filtered data with scrubScheduledClasses()
        //implement filterTestV2.js
    }

  }