import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string()
   .alphanum()
   .min(3)
   .max(30)
   .required(),
  password: Joi.string()
   .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
  email: Joi.string()
   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  age: Joi.number()
   .integer()
   .min(18)
   .max(100),
});

export default userSchema;