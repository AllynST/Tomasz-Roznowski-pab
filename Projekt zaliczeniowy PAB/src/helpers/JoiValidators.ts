import { JOI_ID_Checker, postJoiSchema, ratingJoiSchema, recipeJoiSchema, reviewJoiSchema, threadJoiSchema, userJoiSchema } from "./JoiSchemas"

export const userValidator = (body:any) =>{
    return userJoiSchema.validate(body)
}
export const reviewValidator = (body:any) => {
    return reviewJoiSchema.validate(body)
}
export const threadValidator = (body:any) => {
    return threadJoiSchema.validate(body)
}
export const postValidator = (body:any) => {
    return postJoiSchema.validate(body)
}
export const ratingValidator = (body:any) => {  
    return ratingJoiSchema.validate(body)
}
export const IdValidator = (body:string) => {
    return JOI_ID_Checker.validate(body)
}
export const recipeValidator = (body:any) => {
    return recipeJoiSchema.validate(body)
}