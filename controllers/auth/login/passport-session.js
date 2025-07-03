import { findUser } from "../../db/db-query.js";

export function serialize(user, done) {
    done(null, user.id);
}

export async function deserialize(id, done) {
    try {
        const user = await findUser({ id });

        done(null, user);
    } catch (err) {
        done(err);
    }
}
