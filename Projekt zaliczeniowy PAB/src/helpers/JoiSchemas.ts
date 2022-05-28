import Joi from "joi";

export const recipeJoiSchema =Joi.object({

})
export const userJoiSchema = Joi.object({
    userName: Joi.string().min(7).required().strict(),
    name: Joi.string().required().strict(),
    surname: Joi.string().required().strict(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required().strict(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .strict(),
});
//reviewJoiSchema(obj)
export const reviewJoiSchema = Joi.object({
    content: Joi.string().required()
});
export const threadJoiSchema = Joi.object({
    topic:Joi.string().required(),
    description:Joi.string().required(),
    categories: Joi.array().required()
});
export const postJoiSchema =  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});;
export const ratingJoiSchema = Joi.object({

});
export const JOI_ID_Checker = Joi.string().length(24).required()
