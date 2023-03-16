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


//time is a two part array: hour and minutes
for (var item of filterData)
{
    //[hour, min]:
    let startTime = 
    [parseInt(item["c_hrstart"]) , parseInt(item["c_mnstart"])]

    let endTime = 
    [startTime[0]+ parseInt((parseInt(item["c_duration"])+startTime[1])/60), (startTime[1]+parseInt(item["c_duration"]))%60.0]
    
    retList.push([item["subject"]+" "+item["catalog_nbr"], startTime, endTime, item["mtg_days_1"]])
}

console.log(retList)


