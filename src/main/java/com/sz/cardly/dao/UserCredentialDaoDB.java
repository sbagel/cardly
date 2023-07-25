package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.UserCredentialMapper;
import com.sz.cardly.entities.UserCredential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserCredentialDaoDB implements UserCredentialDao{

    @Autowired
    JdbcTemplate jdbc;

    @Override
    public UserCredential getUserCredentialByID(int id) {
        try {
            final String sql = "SELECT * FROM UserCredential WHERE UserID = ?";
            return jdbc.queryForObject(sql, new UserCredentialMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<UserCredential> getAllUserCredentials() {
        final String sql = "SELECT * FROM UserCredential";

        return jdbc.query(sql, new UserCredentialMapper());
    }

    @Override
    public UserCredential addUserCredential(UserCredential userCredential) {
        final String sql = "INSERT INTO UserCredential(UserID, Email, PasswordHash) VALUES (?, ?, ?)";
        jdbc.update(sql,
                userCredential.getId(),
                userCredential.getEmail(),
                userCredential.getPasswordHash());

        return userCredential;
    }

    @Override
    public boolean updateUserCredential(UserCredential userCredential) {
        final String sql = "UPDATE UserCredential SET "
                +"Email = ?, "
                +"PasswordHash = ?";
        return jdbc.update(sql,
                userCredential.getEmail(),
                userCredential.getPasswordHash()) == 1;
    }

    @Override
    public boolean deleteUserCredentialByID(int id) {
        final String sql = "DELETE FROM UserCredential WHERE UserID = ?";
        return jdbc.update(sql, id) == 1;
    }
}
