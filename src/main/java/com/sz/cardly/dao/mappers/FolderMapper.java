package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.Folder;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class FolderMapper implements RowMapper<Folder> {

    @Override
    public Folder mapRow(ResultSet rs, int rowNum) throws SQLException {
        Folder folder = new Folder();
        folder.setId(rs.getInt("FolderID"));
        folder.setUserID(rs.getInt("UserID"));
        folder.setFolderName(rs.getString("FolderName"));
        folder.setCreationDate(rs.getObject("CreationDate", LocalDateTime.class));
        folder.setLastViewDate(rs.getObject("LastViewDate", LocalDateTime.class));
        folder.setBookmarked(rs.getBoolean("isBookmarked"));
        return folder;
    }
}
