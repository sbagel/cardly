package com.sz.cardly.dao;

import com.sz.cardly.entities.Folder;

import java.util.List;

public interface FolderDao {
    Folder getFolderByID(int id);
    List<Folder> getAllFoldersByUserId(int userID);
    List<Folder> getAllFoldersByDeckId(int deckID);
    List<Folder> getAllFolders();
    Folder addFolder(Folder folder);
    boolean addDeckToFolder(int folderID, int deckID);
    boolean updateFolder(Folder folder);
    boolean deleteFolderByID(int id);
}