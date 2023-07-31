package com.sz.cardly.service;

import com.sz.cardly.dao.FolderDao;
import com.sz.cardly.entities.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderServiceImpl implements FolderService{

    @Autowired
    FolderDao folderDao;

    @Override
    public Folder getFolderByID(int id) {
        return folderDao.getFolderByID(id);
    }

    @Override
    public List<Folder> getAllFoldersByUserId(int UserID) {
        return folderDao.getAllFoldersByUserId(UserID);
    }

    @Override
    public List<Folder> getAllFoldersByDeckId(int deckID) {
        return folderDao.getAllFoldersByDeckId(deckID);
    }

    @Override
    public List<Folder> getAllFolders() {
        return folderDao.getAllFolders();
    }

    @Override
    public Folder addFolder(Folder folder) {
        return folderDao.addFolder(folder);
    }

    @Override
    public boolean addDeckToFolder(int folderID, int deckID) {
        return folderDao.addDeckToFolder(folderID, deckID);
    }

    @Override
    public boolean updateFolder(Folder folder) {
        return folderDao.updateFolder(folder);
    }

    @Override
    public boolean deleteFolderByID(int id) {
        return folderDao.deleteFolderByID(id);
    }
}
