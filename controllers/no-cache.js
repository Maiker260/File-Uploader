export function noCache(req, res, next) {
    res.set({
        "Cache-Control":
            "private, no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
    });
    next();
}
