import { data} from './courseInformation.mjs';

//this basic structure is use to filter out classes that have no time like independent study and phd classes
var filterData = data["results"].filter(function (el)
{
  return el["mtg_time_beg_1"] !='' 
}
);


//suggestions:
//use array map
//use async
//object oriented


var retList = []



//Note that every class on course avail starts at times where the minute hand is...
//divisble by 5
for (var item of filterData)
{

    let startTime = 0
    let endTime = 0  

    if(item["mtg_time_beg_1"].includes("PM"))
    {
        let hourMin = item["mtg_time_beg_1"].split(":")
        let hour = parseInt(hourMin[0])
        let min = parseInt(hourMin[1].split(" ")[0])

        if(hour == 12){
            startTime = 12+(min/60.0) 
        }  
        else
        {
            startTime = 12+hour+(min/60.0) 
        }
    }
    else
    {
        let hourMin = item["mtg_time_beg_1"].split(":")
        let hour = parseInt(hourMin[0])
        let min = parseInt(hourMin[1].split(" ")[0])
        startTime = hour+(min/60.0)
    }




    if(item["mtg_time_end_1"].includes("pm"))
    {
        let hourMin = item["mtg_time_end_1"].split(":")
        if(hourMin.length==1)
        {
            endTime = parseInt(hourMin[0].split("p")[0])
            if(endTime != 12)
            {
                endTime = 12+endTime
            }
        }
        else
        {
            let hour = parseInt(hourMin[0])
            let min = parseInt(hourMin[1].split("p")[0])
            if(hour != 12)
            {
                endTime = 12+hour+(min/60.0)
            }
            else
            {
                endTime = 12+(min/60.0)
            }
        }
    }
    else
    {
        let hourMin = item["mtg_time_end_1"].split(":")

        if(hourMin.length == 1)
        {

            endTime = parseInt(hourMin[0].split("a")[0])
            if(endTime == 12)
            {
                endTime = 0
            }
        }
        else
        {
            let hour = parseInt(hourMin[0])
            let min = parseInt(hourMin[1].split("a")[0])

            if(hour != 12)
            {
                endTime = hour+(min/60.0)
            }
            else
            {
                endTime = (min/60.0)
            }

        }
    }
    retList.push([startTime, endTime, item["subject"]+" "+item["catalog_nbr"]])
}

console.log(retList)


