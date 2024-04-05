import Joi from 'joi';

// Define a schema for validating user input
const schema = Joi.object({
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

// Validate user input against the schema
const userInput = {
  username: 'john_doe',
  password: 'password123',
  repeat_password: 'password123',
  email: 'john.doe@example.com',
  age: 25,
};

const validationResult = schema.validate(userInput);

// Check if validation was successful
if (validationResult.error) {
  // Validation failed, handle error
  console.error('Validation Error:', validationResult.error.details[0].message);
} else {
  // Validation passed, continue processing data
  console.log('Validation Successful:', validationResult.value);
}
