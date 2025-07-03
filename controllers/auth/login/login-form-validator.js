import { body } from "express-validator";

export const loginValidator = [
    body("userEmailLogin")
        .trim()
        .notEmpty()
        .withMessage("Enter your Username or Email."),

    body("passwordLogin").trim().notEmpty().withMessage("Enter your Password"),
];
