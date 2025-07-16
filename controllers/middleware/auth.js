export function requireUser(req, res, next) {
    if (!req.user) {
        return res.redirect("/");
    }
    next();
}
