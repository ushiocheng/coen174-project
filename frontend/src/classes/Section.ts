import Course from "./Course";

export default class Section {
  // clsInfo: Course;
  // 5 digit UID. ex. 50180
  sectionID: number;
  haveClassIn = {
    M: false,
    T: false,
    W: false,
    R: false,
    F: false,
  };
  // Start and end time
  //! Both time are date object on the day of 2001-01-01
  startTime: Date;
  endTime: Date;
  subject: string;
  catalog_nbr: string;
  remainingSeats: number;
  constructor(
    sectionID: number,
    mtgDays: string,
    startHr: string,
    startMn: string,
    duration: number,
    subject: string,
    catalog_nbr: string,
    professor: string,
    status: string,
    remainingSeats: number,
    location: string
  ) {
    // this.clsInfo = course;
    this.sectionID = sectionID;
    mtgDays.split("").forEach((day) => {
      (this.haveClassIn as any)[day] = true;
    });
    this.startTime = new Date(`2001-01-01 ${startHr}:${startMn}`);
    this.endTime = new Date(this.startTime.getTime() + duration * 60 * 1000);
    this.subject = subject;
    this.catalog_nbr = catalog_nbr;
    this.remainingSeats =remainingSeats;
  }
}

// Example for parsing startTime & endTime
//
// let a = new Section();
// let b:any = {
//     "start_hr": "10",
//     "start_min": "45",
//     "duration": "65"
// }
// a.startTime = new Date(`2001-1-1 ${b.start_hr}:${b.start_min}`);
// a.endTime = new Date(a.startTime.getTime() + (b.duration as number *60*1000));
// console.log(a.startTime)
// console.log(a.endTime)
// console.log(((a.endTime as any) - (a.startTime as any))/1000/60);
