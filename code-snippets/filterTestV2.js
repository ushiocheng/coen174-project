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


//sort the first day by start times
//add the first available class
//then find the next available class
//with a different class name and non conflictinf start time 
//until there are no more available classes for the day
//a list should be kept for each week day that shows classes already added that take up a time slot on that day
//then the next day should be sorted by start times including the days a part of the already added list





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




function findIntersect(p1, p2)
{
    if (
    p1[0][0]+p1[0][1]/100.0 < p2[0][0]+p2[0][1]/100.0
    && 
    p1[1][0] +p1[1][1]/100.0 > p2[0][0]+p2[0][1]/100.0)
    {
        return true
    }
    if (
    p2[0][0]+p2[0][1]/100.0 < p1[0][0]+p1[0][1]/100.0 
    && 
    p2[1][0]+p2[1][1]/100.0 > p1[0][0]+p1[0][1]/100.0)
    {
        return true
    }
    if(
    p1[0][0]+p1[0][1]/100.0 < p2[0][0]+p2[0][1]/100.0 
    && 
    p1[1][0]+p1[1][1]/100.0 > p2[1][0]+p2[1][1]/100.0)
    {
        return true
    }
    if(
    p2[0][0]+p2[0][1]/100.0 < p1[0][0]+p1[0][1]/100.0 
    && 
    p2[1][0]+p2[1][1]/100.0 > p1[1][0]+p1[1][1]/100.0)
    {
        return true
    }

    return false
}



function expand(day, marked, index, depth, maxDepth, latestClassEnding, classes,classesAdded, classOrder,schedules)
{
    //used to tell when all desired classes have been added
    if(depth == maxDepth)
    {
        for (let i = day; i< 5; i++)
        {
            var Classes = classes.filter(function (el)
            {
                return (el[3].includes(["M","T","W","R","F"][i]))
            }); 

            Classes.sort(compareFn)

            for(let j = index; j<Classes.length; j++)
            {
                let intersect = false
                for(let pair of marked[i])
                {
                    if(findIntersect([Classes[j][1], Classes[j][2]], pair))
                    {
                        intersect = true
                    }
                }
                if(!intersect && latestClassEnding <= Classes[j][1][0]+Classes[j][1][1]/100.0 
                && !classesAdded.has(Classes[j][0]))
                {
                    classOrder.push(classes[j].slice());
                    schedules.push(classOrder.slice());
                    classOrder.pop();
                }
            }
        }

    }
    else
    {
        var Classes
        for (let i = day; i< 5; i++)
        {
            Classes = classes.filter(function (el)
            {
                return (el[3].includes(["M","T","W","R","F"][i]))
            }); 
            Classes.sort(compareFn)


            for(let j = index; j<Classes.length; j++)
            {

                let intersect = false

                for(let pair of marked[i])
                {
                    if(findIntersect([Classes[j][1], Classes[j][2]], pair))
                    {
                        intersect = true
                    }
                }


                if(!intersect && latestClassEnding <= Classes[j][1][0]+Classes[j][1][1]/100.0 && !classesAdded.has(Classes[j][0]))
                {
                    var tempOrder = classOrder
                    classOrder.push(Classes[j].slice());

                    var tempClasses = classesAdded;
                    classesAdded.add(Classes[j][0].slice());
                    console.log(classesAdded)

                    var tempMarked = marked

                    for (let k =0;k < 5; k++)
                    {
                        if(Classes[j][3].includes(["M", "T", "W", "R","F"][k]) && !([Classes[j][1], Classes[j][2]] in marked[k]))
                        {
                            marked[k].push([Classes[j][1].slice(), Classes[j][2].slice()])
                            console.log(marked)
                        }
                    }

                    if(j==Classes.length-1){
                        expand(
                            i+1, marked, 0, depth+1, maxDepth,
                            0, classes, classesAdded, classOrder, schedules)
                    }
                    else
                    {
                        expand(
                            i, marked, index+1, depth+1, maxDepth,
                            Classes[j][2][0]+Classes[j][2][1]/100.0, 
                            classes, classesAdded, classOrder, schedules)
                    }

                    marked = tempMarked
                    classOrder = tempOrder
                    classesAdded = tempClasses
                }
            }     
        }
    }
}

var classes = [
    [ 'COEN 174', [ 10, 20 ], [ 12, 0], 'TR' ],
    [ 'COEN 174L', [ 14, 15 ], [ 17, 0 ], 'W' ],
    [ 'HIST 33', [ 14, 0 ], [ 15, 40 ], 'TR' ],  
    [ 'CSCI 183', [ 11, 45 ], [ 12, 50 ], 'MWF' ]
];

var marked = [[],[],[],[],[]]


var classesAdded = new Set()
var classOrder = []
var schedules = []

expand(0, marked, 0, 1, 4, 0, classes,classesAdded, classOrder,schedules)

for (let i =0; i<schedules.length; i++)
{
    console.log(schedules[i])
}