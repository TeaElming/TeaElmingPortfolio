/** @format */

export interface Course {
  coursename: string
  credits: number
  field: string
  description: string
}

export interface Year {
  year: number
  courses: Course[]
}

export interface UniversityData {
  university: string
  years: Year[]
}
