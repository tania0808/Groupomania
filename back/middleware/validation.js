const Joi = require('joi');
var passwordValidator = require('password-validator');

const signInValidation = data => {
    const schema = Joi.object({
        userName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        //Minimum eight characters, at least one uppercase letter, 
        //one lowercase letter, one number and one special character:

        password: Joi.string()
            .min(8)
            .max(30)
            .required(),
            
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    return schema.validate(data);
}

const passwordValidation = data => {
    const schema = new passwordValidator();
    
    // Add properties to it
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .has().symbols(1)                               // Must have at least 1 symbol
    return schema.validate(data, { details: true});
}

module.exports.signInValidation = signInValidation;
module.exports.passwordValidation = passwordValidation;
