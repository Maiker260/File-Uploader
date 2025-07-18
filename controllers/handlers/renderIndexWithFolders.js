import { checkUserDataOnDB } from "../db/queries/check-user-data.js";
import { dialogs } from "../shared/navbar-tools.js";
import { findFolderOnDB } from "../db/queries/find-folder.js";
import { buildFolderTree } from "../shared/build-folder-tree.js";

export function renderIndexWithFolders(getFolderId = () => null) {
    return async function (req, res) {
        const user = req.user;
        const folderId = getFolderId(req);

        let currentFolder = folderId
            ? await findFolderOnDB({ id: folderId })
            : await findFolderOnDB({
                  name: "MyFiles",
                  parentId: null,
              });

        if (!currentFolder) {
            return res.redirect("/myfiles");
        }

        const { folders } = await checkUserDataOnDB(user.id);
        folders.sort((a, b) => a.name.localeCompare(b.name));

        const mainFolder = folders.find(
            (folder) => folder.isDefault && folder.parentId === null
        );

        if (!mainFolder) {
            console.error("No main folder found for user:", user.id);
            return res.status(500).send("Main folder not found.");
        }

        const mainFolderWithChildren = {
            ...mainFolder,
            children: buildFolderTree(folders, mainFolder.id),
        };

        res.render("index", {
            user,
            dialogs,
            mainFolder: mainFolderWithChildren,
            currentFolder,
        });
    };
}
