import { getDayOfWeek, dateCompare, checkTimeslot } from "../utils/getDay";
import { Course } from "../../types";
import { existsConcurrentCourse } from "../../models/courses/courses.model";

function checkCourseConsistency(courseDetails: Course) {
  //Check if dayOfWeek is correct for the given date
  const confirmDayOfWeek = getDayOfWeek(courseDetails.startDate);
  if (confirmDayOfWeek !== courseDetails.dayOfWeek) {
    return {
      error: "Provided date doesn't correspond to provided day of the week.",
    };
  }

  //Check if endDate is same as start date or after
  if (!dateCompare(courseDetails.startDate, courseDetails.endDate)) {
    return {
      error: "End date cannot be before start date.",
    };
  }

  // If recurrent= false then recurrenceType can only accept value "oneTime"
  if (
    courseDetails.recurrent === false &&
    courseDetails.recurrenceType != "oneTime"
  ) {
    return {
      error:
        "If the course is not recurrent then it cannot have a recurrence type of monthly or weekly.",
    };

  }

  //Check timeslot consistency
  if (!checkTimeslot(courseDetails.timeslot)) {
    return {
      error: "Course start time cannot be higher than course end time.",
    };
  }
}

export async function checkCourseCreation(courseDetails: Course) {
  //Check course consistency
  const courseConsistencyCheck = checkCourseConsistency(courseDetails);

//Check if a course doesn't already exist for combination location, startDate, timeslot and category
  if (courseConsistencyCheck) {
    
    return courseConsistencyCheck }
    
    const existsCourse = await existsConcurrentCourse(
      courseDetails.category,
      courseDetails.location,
      courseDetails.startDate,
      courseDetails.timeslot,
      courseDetails.dayOfWeek
    );
    if (existsCourse.length !==0) {
      return {
        error:
          "A course of the same type exists already at the specified time and location."
      };
    }
    return null;
}

export async function checkCourseUpdate(courseDetails: Course) {
    //Check course consistency
    const courseConsistencyCheck = checkCourseConsistency(courseDetails);
    //Check if more than one course exists combination location, startDate, timeslot and category
    //Logic is that at least one course like that exists (the one we are updating) but if there is another one then throw an error
    if (courseConsistencyCheck) {
    
      return courseConsistencyCheck }
      
      const existsCourse = await existsConcurrentCourse(
        courseDetails.category,
        courseDetails.location,
        courseDetails.startDate,
        courseDetails.timeslot,
        courseDetails.dayOfWeek
      );
      if (existsCourse.length ===1) {
        return {
          error:
            "A course of the same type exists already at the specified time and location."
        };
      }
      return null;
}
