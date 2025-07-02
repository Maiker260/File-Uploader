export const clearInputs = (req) => {
    req.session.formErrors = {};
    req.session.oldLoginInput = "";
    req.session.oldSignUpInput = {};
};
