import Section from "./Section"

class Course {
    // Subject or major. ex. COEN
    subject : String;
    // Course ID. ex. 108
    courseID : String;
    sections : Array<Section>;
}

export default Course;
