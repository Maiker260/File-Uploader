import { setSessionErrors } from "../auth/session/session-errors.js";

export async function handleFormErrors(form, req, res, errors, input) {
    await setSessionErrors(form, req, {
        errors,
        input,
    });
    return res.redirect(`/auth?mode=${form}`);
}
