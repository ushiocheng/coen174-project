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
    if (a[1][0]+a[1][1]/100.0 < b[1][0]+b[1][1]/100.0) {
      return -1
    }
    else if (a[1][0]+a[1][1]/100.0 > b[1][0]+b[1][1]/100.0) {
      return 1
    }
    return 0
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

    return false
}


//[['CSCI 183', [ 8, 45 ], [ 9, 50 ], 'MWF'], ['CSCI 183', [ 8, 45 ], [ 9, 50 ], 'MWF']]
function orderCopy(item1, item2)
{
    for(let i =0; i<item1.length; i++)
    {
        item2.push([])
        for(let j =0; j<4; j++)
        {
            item2[i].push(item1[i][j])
        }
    }
}

//just copy the names of classes
function classesCopy(item1, item2)
{
    for(let item of item1)
    {
        item2.add(item)
    }
}

//[[[[ 11, 45 ], [ 12, 50 ]], [[ 11, 45 ], [ 12, 50 ]]], [],[],[]]
function markedCopy(item1, item2)
{
    for(let i =0; i<5; i++)
    {
        item2.push([])
        for(let j =0; j<item1[i].length; j++)
        {
            item2[i].push([])
            for(let k =0; k<2; k++)
            {
                item2[i][j].push(item1[i][j][k])
            }
        }
    }
}


function expand(day, marked, index, nofClasses,  latestClassEnding, classesByDay,classesAdded, classOrder,schedules)
{
    //all desired classes have been added
    if(classesAdded.size == nofClasses)
    {
        schedules.push(classOrder.slice());
    }
    //the next day is saturday where there are no classes
    else if(day==5)
    {
        return
    }
    else
    {
        for (let i = day; i< 5; i++)
        {
            var Classes = classesByDay[i]
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

                    var tempOrder = []
                    var tempClasses  = new Set()
                    var tempMarked = []

                    orderCopy(classOrder, tempOrder)
                    classesCopy(classesAdded, tempClasses)
                    markedCopy(marked, tempMarked)

                    tempOrder.push(Classes[j].slice());
                    tempClasses.add(Classes[j][0].slice());
    
                    //all the classes times on other days must be kept track of
                    for (let k =0;k < 5; k++)
                    {
                        if(Classes[j][3].includes(["M", "T", "W", "R","F"][k]) && !([Classes[j][1], Classes[j][2]] in marked[k]))
                        {
                            tempMarked[k].push([Classes[j][1].slice(), Classes[j][2].slice()])
                        }
                    }

                    if(j==Classes.length-1){
                        expand(
                            i+1, tempMarked, 0, nofClasses,
                            0, classesByDay, tempClasses, tempOrder, schedules)
                    }
                    else
                    {
                        expand(
                            i, tempMarked, index+1, nofClasses,
                            Classes[j][2][0]+Classes[j][2][1]/100.0, 
                            classesByDay, tempClasses, tempOrder, schedules)
                    }
                }
            }     
        }
    }
}

var classes = [
    [ 'CSCI 183', [ 8, 45 ], [ 9, 50 ], 'MWF' ],
    [ 'COEN 174', [ 10, 20 ], [ 12, 0], 'TR' ],
    [ 'COEN 174L', [ 14, 15 ], [ 17, 0 ], 'W' ],
    [ 'HIST 33', [ 14, 0 ], [ 15, 40 ], 'TR' ],  
    [ 'CSCI 183', [ 11, 45 ], [ 12, 50 ], 'MWF' ]
];



var marked = [[],[],[],[],[]]
var classesAdded = new Set()
var classOrder = []
var schedules = []


classes.sort(compareFn)
var classesByDay = []


classesByDay.push(classes.filter(function (el)
{
    return (el[3].includes("M"))
}))

classesByDay.push(classes.filter(function (el)
{
    return (el[3].includes("T"))
}))

classesByDay.push(classes.filter(function (el)
{
    return (el[3].includes("W"))
})) 

classesByDay.push(classes.filter(function (el)
{
    return (el[3].includes("R"))
}))

classesByDay.push(classes.filter(function (el)
{
    return (el[3].includes("F"))
})) 




expand(0, marked, 0, 4, 0, classesByDay,classesAdded, classOrder,schedules)


for (let i =0; i<schedules.length; i++)
{
    console.log(schedules[i])
}




























// for (let i = day; i< 5; i++)
// {
//     var Classes = classes.filter(function (el)
//     {
//         return (el[3].includes(["M","T","W","R","F"][i]))
//     }); 
//     // console.log(Classes)

//     for(let j = index; j<Classes.length; j++)
//     {
//         let intersect = false
//         for(let pair of marked[i])
//         {
//             if(findIntersect([Classes[j][1], Classes[j][2]], pair))
//             {
//                 intersect = true
//             }
//         }
//         if(!intersect && latestClassEnding <= Classes[j][1][0]+Classes[j][1][1]/100.0 
//         && !classesAdded.has(Classes[j][0]))
//         {
//             classOrder.push(classes[j].slice());
//             schedules.push(classOrder.slice());
//             classOrder.pop();
//         }
//     }
// }