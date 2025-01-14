const Student = require('./student.js')

class CohortManager {
  constructor() {
    this.cohortObject = {
      cohortName: '',
      studentList: []
    }
    this.cohortList = []
    this.allStudents = []
    this.uniqueID = 1
  }

  findCohort(cohortName) {
    const cohort = this.cohortList.find(
      (cohort) => cohort.cohortName === cohortName
    )
    if (!cohort) {
      return 'cohort does not exist'
    }
    return cohort
  }

  findStudent(studentID) {
    const student = this.allStudents.find(
      (student) => student.studentID === studentID
    )
    if (!student) {
      return 'student does not exist'
    }
    return student
  }

  createCohort(cohortName) {
    const existingCohort = this.cohortList.find(
      (cohort) => cohort.cohortName === cohortName
    )
    if (existingCohort) {
      return 'cohort already exists'
    }

    this.cohortObject.cohortName = cohortName
    this.cohortList.push(this.cohortObject)
    return this.cohortList
  }

  createStudent(studentID, firstName, lastName, githubUsername, email) {
    const newStudent = new Student(
      studentID,
      firstName,
      lastName,
      githubUsername,
      email
    )

    this.uniqueID++
    this.allStudents.push(newStudent)
    return newStudent
  }

  addStudentToCohort(studentID, cohortName) {
    const whichCohort = this.findCohort(cohortName)
    const whichStudent = this.findStudent(studentID)
    const existingStudent = whichCohort.studentList.find(
      (student) => student.studentID === studentID
    )
    if (existingStudent) {
      return 'student already in this cohort'
    }
    whichCohort.studentList.push(whichStudent)
    return this.cohortList
  }

  removeCohort(cohortName) {
    const whichCohort = this.findCohort(cohortName)
    if (whichCohort === 'cohort does not exist') {
      return 'cohort does not exist'
    }
    const newList = []
    this.cohortList.map((e) => {
      if (e !== whichCohort) {
        newList.push(e)
      }
      return newList
    })
    this.cohortList = newList
    return this.cohortList
  }

  removeStudent(studentID, cohortName) {
    const whichStudent = this.findStudent(studentID)
    const whichCohort = this.findCohort(cohortName)
    const newList = []
    if (!whichCohort.studentList.includes(whichStudent)) {
      return 'student does not exist in this cohort'
    }
    whichCohort.studentList.map((e) => {
      if (e !== whichStudent) {
        newList.push(e)
      }
      return newList
    })
    whichCohort.studentList = newList
    return whichCohort
  }
}

module.exports = CohortManager
