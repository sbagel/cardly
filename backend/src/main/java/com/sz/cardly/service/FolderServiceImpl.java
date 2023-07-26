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
    public List<Folder> getAllFolders() {
        return folderDao.getAllFolders();
    }

    @Override
    public Folder addFolder(Folder folder) {
        return folderDao.addFolder(folder);
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
