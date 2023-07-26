package com.sz.cardly.service;

import com.sz.cardly.entities.Folder;

import java.util.List;

public interface FolderService {
    Folder getFolderByID(int id);
    List<Folder> getAllFolders();
    Folder addFolder(Folder folder);
    boolean updateFolder(Folder folder);
    boolean deleteFolderByID(int id);
}
