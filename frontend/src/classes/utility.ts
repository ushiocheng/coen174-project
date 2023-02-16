import Section from "./Section";

function createSectionsByDay(
  sectionsByDay: Array<Array<Section>>,
  allSections: Array<Section>
) {
  interface dayList {
    M: string;
    T: string;
    W: string;
    R: string;
    F: string;
  }
  //need to test on dummy data to see if it works
  let days = ["M", "T", "W", "R", "F"];

  for (let i = 0; i < 5; i++) {
    let sectionsForTheDay: Array<Section> = [];
    for (let j = 0; j < allSections.length; j++) {
      let item = allSections[j];
      if (item.haveClassIn[`${days[i]}` as keyof dayList]) {
        sectionsForTheDay.push(item);
        allSections.splice(j, 1);
        j--;
      }
    }
    sectionsByDay.push(sectionsForTheDay);
  }
}

function compareFn(s1: any, s2: any) {
  if (s1.startTime < s2.startTime) {
    return -1;
  } else if (s1.startTime > s2.startTime) {
    return 1;
  }
  return 0;
}
//intregrate  buffer
function findIntersect(buffer:number, s1: Section, s2: { startTime: Date; endTime: Date }) {
  
  // var temp = new Date(`2001-01-01 00:00`)
  // var temp2 = new Date(`2001-01-01 00:00`);
  // temp.setMinutes(buffer)

  // var end1 = new Date(s1.endTime.getTime()+temp.getTime() - temp2.getTime())
  // var end2 = new Date(s2.endTime.getTime()+temp.getTime() - temp2.getTime())



  //changes:
  var end1 = new Date((s1.endTime.getTime())+buffer*60000)
  var end2 = new Date((s2.endTime.getTime())+buffer*60000)

  
  if (s1.startTime< s2.startTime && end1 > s2.startTime) {
    return true;
  }
  if (s2.startTime < s1.startTime && end2 > s1.startTime) {
    return true;
  }

  return false;
}

// function sectionListCopy(l1, l2) {
//   for (let i = 0; i < l1.size(); i++) {
//     l2[i].subject = l1[i].subject;
//     l2[i].catalog_nbr = l1[i].catalog_nbr;
//     l2[i].haveClassIn = l1[i].haveClassIn;
//     l2[i].startTime = l1[i].startTime;
//     l2[i].endTime = l1[i].endTime;
//   }
// }

function classesCopy(s1: any, s2: any) {
  for (let item of s1) {
    s2.add(item);
  }
}

function markedCopy(l1: any, l2: any) {
  for (let i = 0; i < 5; i++) {
    l2.push([]);
    for (let j = 0; j < l1[i].length; j++) {
      l2[i].push({startTime: l1[i][j].startTime, endTime: l1[i][j].endTime});
    }
  }
}

function expand(
  buffer: number,
  day: number,
  marked: Array<Array<{ startTime: Date; endTime: Date }>>,
  index: number,
  nofClasses: number,
  latestClassEnding: Date,
  sectionsByDay: Array<Array<Section>>,
  classesAdded: Set<string>,
  classOrder: Array<Section>,
  schedules: Array<Array<Section>>
) {
  interface dayList {
    M: string;
    T: string;
    W: string;
    R: string;
    F: string;
  }
  let days = ["M", "T", "W", "R", "F"];

  //all desired classes have been added
  if (classesAdded.size == nofClasses) {
    schedules.push(classOrder);
  }
  //the day is saturday where there are no classes
  else if (day == 5) {
    return;
  } else {
    for (let i = day; i < 5; i++) {
      var sections = sectionsByDay[i];

      for (let j = index; j < sections.length; j++) {
        let intersect = false;


        for (let pair of marked[i]) {
          if (findIntersect(buffer, sections[j], pair)) {
            intersect = true;
          }
        }


        // console.log(latestClassEnding)

        var threshold = new Date((latestClassEnding.getTime())+buffer*60000)

        // console.log(threshold)
        
        if (
          !intersect &&
          threshold <= sections[j].startTime &&
          !classesAdded.has(sections[j].subject + sections[j].catalog_nbr)
        ) {
          var tempOrder = [];
          var tempClasses: Set<string> = new Set();
          //array of taken up starttimes and endtimes
          //which are in data format
          var tempMarked: typeof marked = [];

          //   sectionListCopy(classOrder, tempOrder);
          for (let i = 0; i < classOrder.length; i++)
            tempOrder.push(structuredClone(classOrder[i]));

          classesCopy(classesAdded, tempClasses);
          markedCopy(marked, tempMarked);

          tempOrder.push(sections[j]);
          tempClasses.add(sections[j].subject + sections[j].catalog_nbr);
          //all the classes times on other days must be kept track of
          //when a class is added all of its class times are added
          for (let k = 0; k < 5; k++) {
            if (
              sections[j].haveClassIn[`${days[k]}` as keyof dayList] &&
              !marked[k].includes({
                startTime: new Date(sections[j].startTime),
                endTime: new Date(sections[j].endTime),
              })
            ) {
              tempMarked[k].push({
                startTime: new Date(sections[j].startTime),
                endTime: new Date(sections[j].endTime),
              });
            }
          }

          if (j == sections.length - 1) {
            expand(buffer,
              i + 1,
              tempMarked,
              0,
              nofClasses,
              new Date(`2001-01-01 00:00`),
              sectionsByDay,
              tempClasses,
              tempOrder,
              schedules
            );
          } else {
            expand(buffer,
              i,
              tempMarked,
              j + 1,
              nofClasses,
              sections[j].endTime,
              sectionsByDay,
              tempClasses,
              tempOrder,
              schedules
            );
          }
        }
      }
      index = 0;
      latestClassEnding = new Date(`2001-01-01 00:00`);
    }
  }
}

export { compareFn, expand, createSectionsByDay };
