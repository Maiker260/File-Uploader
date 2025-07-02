export function parseSignUpFormData(body) {
    const {
        passwordSignUp,
        passwordConfirmationSignUp,
        usernameSignUp,
        emailSignUp,
        ...otherInput
    } = body;

    return {
        password: passwordSignUp,
        passwordConfirmation: passwordConfirmationSignUp,
        username: usernameSignUp?.toLowerCase() || "",
        email: emailSignUp?.toLowerCase() || "",
        otherInput,
    };
}
