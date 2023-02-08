
function createClassesByDay(classesByDay, allSections)
{
    //can this be improved???

    classesByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[0]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    }))

    classesByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[1]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    }))

    classesByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[2]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    })) 

    classesByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[3]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    }))

    classesByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[4]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    })) 
}


function compareFn(s1, s2) {
    if (s1.startTime < s2.startTime) {
        return -1
    }
    else if (s1.startTime > s2.startTime) {
        return 1
    }
    return 0
}



function findIntersect(s1, s2)
{
    if (s1.startTime < s2.startTime
    && 
    s1.endTIme > s2.startTime)
    {
        return true
    }
    if (s2.startTime < s1.startTime
    && 
    s2.endTIme > s1.startTime)
    {
        return true
    }

    return false
}


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


function classesCopy(item1, item2)
{
    for(let item of item1)
    {
        item2.add(item)
    }
}


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

export {compareFn, expand, createClassesByDay};