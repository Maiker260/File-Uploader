import { body } from "express-validator";
import { findUser } from "../../db/db-query.js";

export const signUpValidator = [
    body("usernameSignUp")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .matches(/^[a-zA-Z0-9_.-]+$/)
        .withMessage(
            "Username can only contain letters, numbers, underscores, dots, or dashes."
        )
        .isLength({ min: 5 })
        .withMessage("Username must be at least 4 characters long.")
        .isLength({ max: 10 })
        .withMessage("Username must not have more than 10 characters.")
        .custom((value) => {
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);

            if (!hasLetter || !hasNumber) {
                throw new Error(
                    "Username must contain both letters and numbers."
                );
            }

            return true;
        })
        .custom(async (username) => {
            const existingUser = await findUser({ username });

            if (existingUser) {
                throw new Error("Username already exist.");
            }
        }),

    body("emailSignUp")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("A valid email is required.")
        .custom(async (email) => {
            const existingEmail = await findUser({ email });

            if (existingEmail) {
                throw new Error("Email already exist.");
            }
        }),

    body("passwordSignUp")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),

    body("passwordConfirmationSignUp")
        .notEmpty()
        .withMessage("Password confirmation is required.")
        .custom((value, { req }) => value === req.body.passwordSignUp)
        .withMessage("Passwords do not match."),
];
