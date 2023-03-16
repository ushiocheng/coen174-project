// fetch("https://www.scu.edu/apps/ws/courseavail/search/4420/ugrad/math+11")
//   .then((courses) => courses.json())
//   .then((courses) => console.log(courses));

// Load-> get quarter info and default to most recent one
// When user changes, update quarter id, retrieve all courses for the quarter
// When user enters course title, match it to one of the existing courses
let selectedQuarter = "Winter 2023"; // Get string from form
let selectedQuarterID;
let query = "COEN"; // Get string from form

async function search() {
  let response = await fetch("https://www.scu.edu/apps/ws/courseavail/autocomplete/quarters/");
  let quarterIDs = await response.json();

  quarterIDs.results.indb.forEach((pair) => {
    if (pair.label == selectedQuarter) selectedQuarterID = pair.value;
  });
  selectedQuarterID = selectedQuarterID || quarterIDs.results.indb[0].value;

  response = await fetch(`https://www.scu.edu/apps/ws/courseavail/search/${selectedQuarterID}/ugrad/${query}`);
  let queryMatches = await response.json();

  return queryMatches;
}

async function getAutofillList() {
  let response = await fetch(`https://www.scu.edu/apps/ws/courseavail/autocomplete/${selectedQuarterID}/ugrad/courses`);
  let allCourses = response.json();
}

search().then((queryMatches) => {
  // Update list
  console.log(queryMatches);
});
