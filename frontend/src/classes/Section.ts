import Course from './Course'

class Section {
    clsInfo: Course;
    // 5 digit UID. ex. 50180
    sectionID: number;
    haveClassIn: {
        M: boolean,
        T: boolean,
        W: boolean,
        R: boolean,
        F: boolean
    }
    // Start and end time
    //! Both time are date object on the day of 2001-01-01
    startTime:Date;
    endTime:Date;
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

export default Section;