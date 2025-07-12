import { folderServerRequest } from "./folder-modules/folder-server-request.js";

export async function renameFolder(data) {
    await folderServerRequest(data, "renameFolder", "rename");
}
