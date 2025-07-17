export function buildFolderTree(folders, parentId) {
    return folders
        .filter((folder) => folder.parentId === parentId)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder) => ({
            ...folder,
            children: buildFolderTree(folders, folder.id),
        }));
}
