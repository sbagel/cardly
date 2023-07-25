package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.FolderMapper;
import com.sz.cardly.entities.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FolderDaoDB implements FolderDao {

    @Autowired
    JdbcTemplate jdbc;
    @Override
    public Folder getFolderByID(int folderID) {
        try {
            final String sql = "SELECT * FROM Folder WHERE FolderID = ?";
            return jdbc.queryForObject(sql, new FolderMapper(), folderID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Folder> getAllFolders() {
        final String sql = "SELECT * FROM Folder";
        return jdbc.query(sql, new FolderMapper());
    }

    @Override
    public Folder addFolder(Folder folder) {
        final String sql = "INSERT INTO Folder(UserID, FolderName, CreationDate, LastViewDate, isBookmarked) " +
                "VALUES (?, ?, ?, ?, ?)";
        jdbc.update(sql,
                folder.getUserID(),
                folder.getFolderName(),
                folder.getCreationDate(),
                folder.getLastViewDate(),
                folder.isBookmarked());

        int id = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        folder.setId(id);
        return folder;
    }

    @Override
    public boolean updateFolder(Folder folder) {
        final String sql = "UPDATE Folder SET " +
                "UserID = ?, " +
                "FolderName = ?, " +
                "CreationDate = ?, " +
                "LastViewDate = ?, " +
                "isBookmarked = ?";
        return jdbc.update(sql,
                folder.getUserID(),
                folder.getFolderName(),
                folder.getCreationDate(),
                folder.getLastViewDate(),
                folder.isBookmarked()) == 1;
    }

    @Override
    public boolean deleteFolderByID(int id) {
        final String sql = "DELETE FROM Folder WHERE FolderID = ?";
        return jdbc.update(sql, id) == 1;
    }
}
