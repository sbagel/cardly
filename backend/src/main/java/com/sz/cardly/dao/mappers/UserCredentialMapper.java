package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.UserCredential;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserCredentialMapper implements RowMapper<UserCredential> {
    @Override
    public UserCredential mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserCredential userCredential = new UserCredential();
        userCredential.setId(rs.getInt("UserID"));
        userCredential.setEmail(rs.getString("Email"));
        userCredential.setPasswordHash(rs.getString("PasswordHash"));
        return userCredential;
    }
}
