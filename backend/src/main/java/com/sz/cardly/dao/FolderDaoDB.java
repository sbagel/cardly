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
    public List<Folder> getAllFoldersByUserId(int userID) {
        try {
            final String sql = "SELECT * FROM Folder WHERE UserID = ? ORDER BY lastViewDate DESC";
            return jdbc.query(sql, new FolderMapper(), userID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Folder> getAllFoldersByDeckId(int deckID) {
        try {
            final String sql = "SELECT DISTINCT f.* FROM folder f INNER JOIN folderdeck fd ON f.folderID = fd.folderID WHERE fd.DeckID = ?";
            return jdbc.query(sql, new FolderMapper(), deckID);
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
    public boolean addDeckToFolder(int folderID, int deckID) {
        final String deleteSql = "DELETE FROM folderdeck WHERE DeckID = ?";
        final String insertSql = "INSERT INTO folderdeck (FolderID, DeckID) VALUES (?, ?)";
        try {
            jdbc.update(deleteSql, deckID);
            if (folderID != 0) {
                jdbc.update(insertSql, folderID, deckID);
            }
            return true;
        } catch (DataAccessException ex) {
            return false;
        }
    }

    @Override
    public boolean updateFolder(Folder folder) {
        final String sql = "UPDATE Folder SET " +
                "UserID = ?, " +
                "FolderName = ?, " +
                "CreationDate = ?, " +
                "LastViewDate = ?, " +
                "isBookmarked = ? "
                +"WHERE FolderID = ?";
        return jdbc.update(sql,
                folder.getUserID(),
                folder.getFolderName(),
                folder.getCreationDate(),
                folder.getLastViewDate(),
                folder.isBookmarked(),
                folder.getId()) == 1;
    }

    @Override
    public boolean deleteFolderByID(int id) {
        final String sql = "DELETE FROM Folder WHERE FolderID = ?";
        return jdbc.update(sql, id) == 1;
    }
}
