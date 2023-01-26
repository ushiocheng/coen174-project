



const {data} = require('./jsonVar.js');
console.log(data);


//open("jsonData ")


console.log(data)
//console.log(jsonList);



//this basic structure is use to filter out independent study an phd classes which have no time
var newArray = jsonList.filter(function (el)
{
  return el["mtg_time_beg_1"] !='' 
}
);
//use array map
//use async
//object oriented

//take previously




//need to extract the class name and convert the class time to eurpoean times


retList = []

//this may not be necessary
//all that needs to be done is filter the array of jsons
for(item in newArray)
{

    startTime = 0
    endTime = 0  
    
    if(item["mtg_time_beg_1"].includes("pm"))
    {
        HourMin = item["mtg_time_beg_1"].split(":")
        Hour = int(HourMin[0])
        min = int(HourMin[1].split(" ")[0])
        startTime = 12+Hour+(min/60) 
    }
    else
    {
        HourMin = item["mtg_time_beg_1"].split(":")
        Hour = int(HourMin[0])
        min = int(HourMin[1].split(" ")[0])
        startTime = Hour+(min/60)
    }
    if(item["mtg_time_end_1"].includes("pm"))
    {
        HourMin = item["mtg_time_end_1"].split(":")
        Hour = int(HourMin[0])
        min = int(HourMin[1].split("p")[0])
        endTime = 12+Hour+(min/60) 
    }
    else
    {
        HourMin = item["mtg_time_end_1"].split(":")
        Hour = int(HourMin[0])
        min = int(HourMin[1].split("a")[0])
        endTime = Hour+(min/60)
    }
    retList.push(startTime, endTime, item["subject"]+" "+item["catalog_nbr"] )
}

print(retList)