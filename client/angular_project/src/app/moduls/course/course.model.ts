
export class Course {
    id ?: number
    name ?:string
    categoryId ?:number
    amount?:number
    beginDate ?:Date
    syllabus? :string[]
    learningType ?:LearningType
    lecturerId ?:number
    image?:string    
}
export enum LearningType {
    FRONTAL = 1,
    ZOOM = 2
}