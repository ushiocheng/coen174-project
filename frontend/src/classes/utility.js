
function createSectionsByDay(sectionsByDay, allSections)
{
    //can this be improved???
    //need to test on dummy data to see if it works
    sectionsByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[0]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    }))

    sectionsByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[1]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    }))

    sectionsByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[2]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    })) 

    sectionsByDay.push(allSections.filter(function (item, index)
    {
        let temp = item.haveClassIn[3]
        if(temp)
        {
            allSections.splice(index, 1)
        }
        return (temp)
    }))

    sectionsByDay.push(allSections.filter(function (item, index)
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


function sectionListCopy(l1, l2)
{
    for(let i =0 ; i<l1.size(); i++)
    {
        l2[i].subject = l1[i].subject
        l2[i].catalog_nbr = l1[i].catalog_nbr
        l2[i].haveClassIn = l1[i].haveClassIn
        l2[i].startTime = l1[i].startTime
        l2[i].endTime = l1[i].endTime
    }
}


function classesCopy(s1, s2)
{
    for(let item of s1)
    {
        s2.add(item)
    }
}


function markedCopy(l1, l2)
{
    for(let i =0; i<5; i++)
    {
        l2.push([])
        for(let j =0; j<l1[i].length; j++)
        {
            l2[i].push([])
            l2[i][j].push(l1[i][j][0])
            l2[i][j].push(l1[i][j][1])
        }
    }
}


function expand(day, marked, index, nofClasses,  latestClassEnding, sectionsByDay,classesAdded, classOrder,schedules)
{
    //all desired classes have been added
    if(classesAdded.size == nofClasses)
    {
        schedules.push(classOrder);
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
            var sections = sectionsByDay[i]

            for(let j = index; j<sections.length; j++)
            {
                let intersect = false

                for(let pair of marked[i])
                {
                    if(findIntersect([sections[j][1], sections[j][2]], pair))
                    {
                        intersect = true
                    }
                }


                if(!intersect && latestClassEnding <= sections[j].startTime 
                    && 
                !classesAdded.has(sections[j].subject+sections[j].catalog_nbr))
                {

                    var tempOrder = []
                    var tempClasses  = new Set()
                    //array of taken up starttimes and endtimes
                    //which are in data format
                    var tempMarked = []

                    sectionListCopy(classOrder, tempOrder)
                    classesCopy(classesAdded, tempClasses)
                    markedCopy(marked, tempMarked)

                    tempOrder.push(sections[j]);      
                    tempClasses.add(sections[j].subject+sections[j].catalog_nbr);
    
                    //all the classes times on other days must be kept track of
                    //when a class is added all of its class times are added
                    for (let k =0;k < 5; k++)
                    {
                        if(sections[j].haveClassIn[k] && !([sections[j].startTime, sections[j].endTime] in marked[k]))
                        {
                            tempMarked[k].push([sections[j].startTime, sections[j].endTime])
                        }
                    }

                    if(j==sections.length-1){
                        expand( 
                            i+1, tempMarked, 0, nofClasses,
                            0, sectionsByDay, tempClasses, tempOrder, schedules)
                    }
                    else
                    {
                        expand( 
                            i, tempMarked, index+1, nofClasses,
                            sections[j].endTime, 
                            sectionsByDay, tempClasses, tempOrder, schedules)
                    }
                }
            }     
            index =0
        }
    }
}

export {compareFn, expand, createSectionsByDay};