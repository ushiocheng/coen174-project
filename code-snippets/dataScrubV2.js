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

//time is only in hours:
//Note that every class on course avail starts at times where the minute hand is...
//divisble by 5
// for (var item of filterData)
// {
//     let startTime = parseInt(item["c_hrstart"]) + (parseInt(item["c_mnstart"])/60.0)
//     let endTime = startTime + (parseInt(item["c_duration"])/60.0)
    
//     retList.push([startTime, endTime, item["subject"]+" "+item["catalog_nbr"]])
// }

// console.log(retList)


//time is a two part array: hour and minutes
for (var item of filterData)
{
    //[hour, min]:
    let startTime = 
    [parseInt(item["c_hrstart"]) , parseInt(item["c_mnstart"])]

    let endTime = 
    [startTime[0]+ parseInt((parseInt(item["c_duration"])+startTime[1])/60), (startTime[1]+parseInt(item["c_duration"]))%60.0]
    
    retList.push([startTime, endTime, item["subject"]+" "+item["catalog_nbr"]])
}

console.log(retList)


