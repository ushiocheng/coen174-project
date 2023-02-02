//this is the new model based on the old model of filterTest.js
//it takes into account the idea that classes can be at the same time as long as
//they are on different days

//use "mtg_days_1" which tells the days that the classes take place
//start by filtering all classes that have a monday start time
//when a class has been chosen to start monday and it may also take place other days 
//keep track of the times for those days as well


//todo:
//one problem to adress is the required labs
//should they be autoaticlly added (harder)
//or should the user make the choice to put it into their schedule
//^like normal course avail

//note: padding feature to implement minimum time between two classes
//10 minute difference -> 5 minute padding to the start and end of each class
import {data} from './courseInformation.mjs'

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

//beable to copy:
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

//beable to copy:
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
    //the day is saturday where there are no classes
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

                //used for testing:
                // console.log("classes added:")
                // for(var item of classesAdded)
                // {
                //     console.log(item)
                // }
                // console.log("marked pairs:")
                // for(let item of marked)
                // {
                //     console.log(item)
                // }
                // console.log("current class:")
                // console.log(Classes[j])

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
                    //when a class is added all of its class times are added
                    for (let k =0;k < 5; k++)
                    {
                        if(Classes[j][3].includes(["M", "T", "W", "R","F"][k]) && !([Classes[j][1].slice(), Classes[j][2].slice()] in marked[k]))
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
            index =0
        }
    }
}

// var classes = [
//     [ 'CSCI 183', [ 8, 45 ], [ 9, 50 ], 'MWF' ],
//     [ 'COEN 174', [ 10, 20 ], [ 12, 0], 'TR' ],
//     [ 'COEN 174L', [ 14, 15 ], [ 17, 0 ], 'W' ],
//     [ 'HIST 33', [ 14, 0 ], [ 15, 40 ], 'TR' ],  
//     [ 'CSCI 183', [ 11, 45 ], [ 12, 50 ], 'MWF' ],
//     ['CSCI 144', [ 11, 45 ], [ 12, 50 ], 'MWF']
// ];

// let numberOfClasses = 5

// var marked = [[],[],[],[],[]]
// var classesAdded = new Set()
// var classOrder = []
// var schedules = []


// // classes.sort(compareFn)
// var classesByDay = []



//to avoid making the same schedule with a different order
// classesByDay.push(classes.filter(function (el)
// {
//     return (el[3].includes("M"))
// }))

// classesByDay.push(classes.filter(function (el)
// {
//     let previous = false
//     for(var arr of classesByDay)
//     {
//         if(arr.includes(el))
//         {
//             previous = true
//         }
//     }
//     return (el[3].includes("T") && !previous)
// }))

// classesByDay.push(classes.filter(function (el)
// {
//     let previous = false
//     for(var arr of classesByDay)
//     {
//         if(arr.includes(el))
//         {
//             previous = true
//         }
//     }
//     return (el[3].includes("W")&& !previous)
// })) 

// classesByDay.push(classes.filter(function (el)
// {
//     let previous = false
//     for(var arr of classesByDay)
//     {
//         if(arr.includes(el))
//         {
//             previous = true
//         }
//     }
//     return (el[3].includes("R")&& !previous)
// }))

// classesByDay.push(classes.filter(function (el)
// {
//     let previous = false
//     for(var arr of classesByDay)
//     {
//         if(arr.includes(el))
//         {
//             previous = true
//         }
//     }
//     return (el[3].includes("F")&& !previous)
// })) 



// expand(0, marked, 0, numberOfClasses, 0, classesByDay,classesAdded, classOrder,schedules)


// for (let i =0; i<schedules.length; i++)
// {
//     console.log(schedules[i])
// }



// classes  = function buildSchedules()
// {

//     var Classes = Array.from(this.classList)
//     // var classes = [
//     //     [ 'CSCI 183', [ 8, 45 ], [ 9, 50 ], 'MWF' ],
//     //     [ 'COEN 174', [ 10, 20 ], [ 12, 0], 'TR' ],
//     //     [ 'COEN 174L', [ 14, 15 ], [ 17, 0 ], 'W' ],
//     //     [ 'HIST 33', [ 14, 0 ], [ 15, 40 ], 'TR' ],  
//     //     [ 'CSCI 183', [ 11, 45 ], [ 12, 50 ], 'MWF' ],
//     //     ['CSCI 144', [ 11, 45 ], [ 12, 50 ], 'MWF']
//     // ];
    
//     let numberOfClasses = 5
    
//     var marked = [[],[],[],[],[]]
//     var classesAdded = new Set()
//     var classOrder = []
//     var schedules = []
    
    
//     Classes.sort(compareFn)
//     var classesByDay = []
    
    
    
//     //to avoid making the same schedule with a different order
//     classesByDay.push(Classes.filter(function (el)
//     {
//         return (el[3].includes("M"))
//     }))
    
//     classesByDay.push(Classes.filter(function (el)
//     {
//         let previous = false
//         for(var arr of classesByDay)
//         {
//             if(arr.includes(el))
//             {
//                 previous = true
//             }
//         }
//         return (el[3].includes("T") && !previous)
//     }))
    
//     classesByDay.push(Classes.filter(function (el)
//     {
//         let previous = false
//         for(var arr of classesByDay)
//         {
//             if(arr.includes(el))
//             {
//                 previous = true
//             }
//         }
//         return (el[3].includes("W")&& !previous)
//     })) 
    
//     classesByDay.push(Classes.filter(function (el)
//     {
//         let previous = false
//         for(var arr of classesByDay)
//         {
//             if(arr.includes(el))
//             {
//                 previous = true
//             }
//         }
//         return (el[3].includes("R")&& !previous)
//     }))
    
//     classesByDay.push(Classes.filter(function (el)
//     {
//         let previous = false
//         for(var arr of classesByDay)
//         {
//             if(arr.includes(el))
//             {
//                 previous = true
//             }
//         }
//         return (el[3].includes("F")&& !previous)
//     })) 
    



//     expand(0, marked, 0, this.chosenUnScheduled.size, 0, classesByDay,classesAdded, classOrder,schedules);

//     this.scheduleList = schedules


// }

export {compareFn, expand};