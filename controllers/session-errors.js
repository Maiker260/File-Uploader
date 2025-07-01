export function setSessionErrors(req, { errors, input }) {
    req.session.formErrors = errors;
    req.session.oldSignUpInput = input;

    return new Promise((resolve, reject) => {
        req.session.save((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}
