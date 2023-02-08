
function createClassesByDayNew(classesByDay, classList)
{
    let newArr = []
    classesByDay.push(classList.filter(function (el)
    {
        if(el[3].includes("M"))
        {
            return true
        }
        else
        {
            newArr.push(el)
            return false
        }
    }))
    classList = newArr
    newArr = []
    classesByDay.push(classList.filter(function (el)
    {
        if(el[3].includes("M"))
        {
            return true
        }
        else
        {
            newArr.push(el)
            return false
        }
    }))
    classList = newArr
    newArr = []
    classesByDay.push(classList.filter(function (el)
    {
        if(el[3].includes("M"))
        {
            return true
        }
        else
        {
            newArr.push(el)
            return false
        }
    }))
    classList = newArr
    newArr = []
    classesByDay.push(classList.filter(function (el)
    {
        if(el[3].includes("M"))
        {
            return true
        }
        else
        {
            newArr.push(el)
            return false
        }
    }))
    classList = newArr
    newArr = []
    classesByDay.push(classList.filter(function (el)
    {
        if(el[3].includes("M"))
        {
            return true
        }
        else
        {
            newArr.push(el)
            return false
        }
    }))
}


function createClassesByDay(classesByDay, classList)
{
    classesByDay.push(classList.filter(function (el)
    {
        return (el[3].includes("M"))
    }))

    classesByDay.push(classList.filter(function (el)
    {
        let previous = false
        for(var arr of classesByDay)
        {
            if(arr.includes(el))
            {
                previous = true
            }
        }
        return (el[3].includes("T") && !previous)
    }))

    classesByDay.push(classList.filter(function (el)
    {
        let previous = false
        for(var arr of classesByDay)
        {
            if(arr.includes(el))
            {
                previous = true
            }
        }
        return (el[3].includes("W")&& !previous)
    })) 

    classesByDay.push(classList.filter(function (el)
    {
        let previous = false
        for(var arr of classesByDay)
        {
            if(arr.includes(el))
            {
                previous = true
            }
        }
        return (el[3].includes("R")&& !previous)
    }))

    classesByDay.push(classList.filter(function (el)
    {
        let previous = false
        for(var arr of classesByDay)
        {
            if(arr.includes(el))
            {
                previous = true
            }
        }
        return (el[3].includes("F")&& !previous)
    })) 
}


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

export {compareFn, expand, createClassesByDay, createClassesByDayNew};