//this does not work since a single class can have multiple days that they can
//take place
//what needs to be included is the string of days that the class takes place 
//when being compared to another class a schedule conflict only takes place when
//they share a day
//so far the data has shown that most classes start at the same time regardless of 
//what days they run

//one thing that needs to be delt with is the required labs
//should they be autoaticlly added (harder)
//or should the user make the choice to put it into their schedule



//use "mtg_days_1" which tells the days that the classes take place
//start by filtering all classes that have a monday start time
//when a class has been chosen to start monday and it also takes place other days in "mtg_days_1"
//then keep track of the times for those days as well
//



//note: padding feature to implement minimum time between two classes
//10 minute difference -> 5 minute padding for each class



function compareFn(a, b) {
    if (a[1][0]< b[1][0]) {
      return -1;
    }
    else if (a[1][0]> b[1][0]) {
      return 1;
    }
    else if(a[1][0] == b[1][0])
    {
        if(a[1][1] < b[1][1])
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }
};


//sort the first day by start times
//add the first available class
//then find the next available class
//with a different class name and non conflictinf start time 
//until there are no more available classes for the day
//a list should be kept for each week day that shows classes already added that take up a time slot on that day
//then the next day should be sorted by start times including the days a part of the already added list





tue = []
wed = []
thu = []
fri = []


mClasses = classes.filter(function (el)
{
  return (el[3].includes("M"))
}); 

mClasses.sort(compareFn)

//choose a combination of classes
//for each chosen class add it to the lists (tue, wed, thu, fri) for each other day it takes place

//this really for the chosen mClasses not all of them
for(item in mCLasses)
{
    for (char in item[3])
    {
        if(char=="T")
        {
            //notice the dimenssion differnce makes these disernable as 
            //set times that cannot be ignored
            tue.append(item.slice(0, 3))
        }
        if(char=="W")
        {
            wed.append(item.slice(0, 3))
        }
        if(char=="R")
        {
            thu.append(item.slice(0, 3))
        }
        if(char=="F")
        {
            fri.append(item.slice(0, 3))
        }

    }
}

tClasses = classes.filter(function (el)
{
  return (el[3].includes("T"))
}); 

tClasses.push(...tue)
tClasses.sort(compareFn)

for(item in tCLasses)
{
    for (char in item[3])
    {
        if(char=="W")
        {
            wed.append(item.slice(0, 3))
        }
        if(char=="R")
        {
            thu.append(item.slice(0, 3))
        }
        if(char=="F")
        {
            fri.append(item.slice(0, 3))
        }

    }
}

//...
//more...
wClasses = classes.filter(function (el)
{
  return (el[3].includes("W"))
}); 

rClasses = classes.filter(function (el)
{
  return (el[3].includes("R"))
}); 

fClasses = classes.filter(function (el)
{
  return (el[3].includes("F"))
}); 



//sameDay is a bool that says whether to switch
//days or not




classes = [
    [ 'AMTH 108', [ 11, 45 ], [ 12, 50 ], 'MWF' ],
    [ 'AMTH 210', [ 7, 10 ], [ 9, 0 ], 'T' ],
    [ 'ACTG 130', [ 13, 0 ], [ 14, 5 ], 'MWF' ],  
    [ 'ACTG 131', [ 11, 45 ], [ 12, 50 ], 'MWF' ],
    [ 'CHEM 12', [ 13, 0 ], [ 14, 5 ], 'MWF' ],
    [ 'CHEM 12 Lab', [ 8, 20 ], [ 11, 10 ], 'T' ]
];

marked = [[],[],[],[],[]]
dayList = ["M", "T", "W", "R","F"]
day = 0
latestClassEnding =0




function expand(sameDay,  classes, dayList, day, marked, latestClassEnding)
{
    //used to tell when all desired classes have been added
    if(depth == maxDepth)
    {
     
    }
    else
    {
        for (let i = day; i< 5; i++)
        {
            if(i == day && !sameDay)
            {
                Classes = classes.filter(function (el)
                {
                    return (el[3].includes(dayList[i]))
                }); 
                Classes.sort(compareFn)
                latestClassEnding = 0
            }

            else if(i != day)
            {
                Classes = classes.filter(function (el)
                {
                    return (el[3].includes(dayList[i]))
                }); 
            }
            //note last index could be zero if this is a new day
            for(let j = lastIndex; j<Classes.length; j++)
            {
                //latest class ending is zero if this is the start of a new day
                if(!classes[j] in marked[day] && latestClassEnding <= Classes[j][1][0])
                {
                    //class order is a schedule in the making
                    classOrder.push(classes[j].slice());

                    //set the marked times
                    for (let i =0;i<Classes.length; i++)
                    {
                        if(Classes[j][3].includes(char))
                        {
                            marked[i].push(Classes[j])
                        }
                    }

                    if(j==Classes.length-1){
                        expand(false, Classes, day+1, marked, className)
                    }
                    else
                    {
                        expand(true, Classes, day, marked, className)
                    }


                    classOrder.pop();

                }
            }     
        }
    }

}

expand(false, 0, dayList, day)