//this was the intial model that assumes all classes are on the same day
//it does not take into account the idea that classes can be on the same time as long as
//they are on different days

//sorting method by the starting time of a class
function compareFn(a, b) {
  if (a[1][0] < b[1][0]) {
    return -1;
  }
  if (a[1][0] > b[1][0]) {
    return 1;
  }
  return 0;
}

//add all working schedules to the schedules list
function expand(depth, maxDepth, index, schedules, classesAdded, classes, classOrder, latestClassEnding) {
  if (depth == maxDepth) {
    //last class that the user wants is added to the classOrder...
    //and the classOrder is added to the schedule
    for (let j = index; j < classes.length; j++) {
      if (!classesAdded.has(classes[j][0]) && latestClassEnding <= classes[j][1][0]) {
        classOrder.push(classes[j].slice());
        schedules.push(classOrder.slice());
        classOrder.pop();
      }
    }
  } else {
    //a class is added to the classOrder and then...
    //expand is recursively called for the rest of the classes that need to be added...
    for (let j = index; j < classes.length; j++) {
      if (!classesAdded.has(classes[j][0]) && latestClassEnding <= classes[j][1][0]) {
        classOrder.push(classes[j].slice());
        classesAdded.add(classes[j][0]);
        expand(depth + 1, maxDepth, index + 1, schedules, classesAdded, classes, classOrder, classes[j][1][1]);
        classOrder.pop();
        classesAdded.delete(classes[j][0]);
      }
    }
  }
}

//Toy input example...
//All entries have class name and start and end times
//Assume the user wants three classes...
//MATH 6, COEN 12, CSCI 53
//Assume all the schedules for these classes have been scraped
//Also the start and end times of schedules have been converted to European times
//Assume there is no minimum gap between class
//ie: ["MATH 6",[9,11]] and ["COEN 12",[11,13]] may be added together but
//["MATH 6",[9,11]] and ["COEN 12",[10,12]] may not be added together

let classes = [
  ["MATH 6", [9, 11]],
  ["MATH 6", [10, 12]],
  ["MATH 6", [13, 15]],
  ["COEN 12", [9, 11]],
  ["COEN 12", [9, 11]],
  ["COEN 12", [14, 16]],
  ["CSCI 53", [8, 10]],
  ["CSCI 53", [17, 19]],
  ["CSCI 53", [16, 18]],
];

//sorting method by the starting time of a class
//this makes accepting a new course time less computationaly expensive
//you just need to compare the new course starting time to the "latestClassEnding" (below)
classes.sort(compareFn);

//MATH 6, COEN 12, CSCI 53
let numberOfClasses = 3;

//No class ends at 0 or starts at 0 (European time)
//this is updated for the most recent class end time in the expand function
let latestClassEnding = 0;

//used to prevent two of the same class names in the users schedules
//course avail enforces this
let classesAdded = new Set();

//when classOrder has a course order with all the course names that the user wants it is added to the schedules list
let classOrder = [];

//list of schedules
let schedules = [];

//add all working schedules to the schedules list
expand(1, numberOfClasses, 0, schedules, classesAdded, classes, classOrder, latestClassEnding);

//each log is a working schedule
for (let i = 0; i < schedules.length; i++) {
  console.log(schedules[i]);
}
