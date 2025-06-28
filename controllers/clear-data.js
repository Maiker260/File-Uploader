export const clearData = (req, res, next) => {
    const currentPath = req.path;

    if (
        currentPath.startsWith("/auth") &&
        req.session.lastVisitedPath &&
        !req.session.lastVisitedPath.startsWith("/auth")
    ) {
        // User came to /auth from another route
        req.session.formErrors = null;
        req.session.oldLoginInput = null;
        req.session.oldSignUpInput = null;
        req.session.formDataTimestamp = null;
    }

    // Save current path for the next request
    req.session.lastVisitedPath = currentPath;

    next();
};
