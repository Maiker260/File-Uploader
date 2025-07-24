import prisma from "./prisma.js";

export async function dbQuery(model, request, args) {
    let formatedName = request.slice(0, -1) + "ing";
    if (request == "find") {
        request = "findUnique";
        formatedName == "finding";
    }

    try {
        const data = await prisma[model][request]?.(args);

        return data;
    } catch (err) {
        console.log(`Error ${formatedName} the ${model}:`, err);
        throw err;
    }
}
