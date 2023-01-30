
//should there be a limit to the amount of units to take?
//can there be no cap on the number of classes with no schedule

class classes{

    constructor(rawJSON){
      this.scheduled  = []
      this.unScheduled = []
      //these are sets in case the user...
      //adds the same class 2 or more times
      this.chosenScheduled = new Set()
      this.chosenUnScheduled = new Set()
      //the data only needs to be set once as a json with results
      //then it can be used to populate scheduled and unScheduled
      this.data = rawJSON
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

  
    buildSchedules(){
        //implement the data srub for this.chosenScheduled and the this.chosenUnScheduled


        //implement the updated filter test function
        //first convert the set this.chosenScheduled into a list with only starting time, ending time, and course name
    }

  }