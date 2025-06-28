import { body } from "express-validator";

export const loginValidator = [
    body("userEmailLogin")
        .notEmpty()
        .withMessage("Enter your Username or Email."),

    body("passwordLogin").notEmpty().withMessage("Enter your Password"),
];
