import { body } from "express-validator";

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
        .custom((value) => {
            const hasLetter = /[a-zA-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);

            if (!hasLetter || !hasNumber) {
                throw new Error(
                    "Username must contain both letters and numbers."
                );
            }

            return true;
        }),

    body("emailSignUp")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("A valid email is required."),

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
