export function setSessionErrors(form, req, { errors, input }) {
    req.session.formErrors = errors;
    req.session[form === "login" ? "oldLoginInput" : "oldSignUpInput"] = input;

    return new Promise((resolve, reject) => {
        req.session.save((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}
