import Section from "./Section"

class Course {
    // Subject or major. ex. COEN
    subject : String;
    // Course ID. ex. 108
    courseID : String;
    sections : Array<Section> = new Array();
    constructor(subject:string|String, courseID:string|String){
        this.subject = subject;
        this.courseID = courseID;
    }
}

export default Course;
