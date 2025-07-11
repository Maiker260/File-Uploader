import { folderServerRequest } from "./folder-modules/folder-server-request.js";

export async function renameFolder(folderId) {
    await folderServerRequest({ folderId }, "renameFolder", "rename");
}
