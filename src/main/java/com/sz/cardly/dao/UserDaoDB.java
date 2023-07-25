package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.UserMapper;
import com.sz.cardly.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoDB implements UserDao{
    @Autowired
    JdbcTemplate jdbc;

    @Override
    public User getUserByID(int id) {
        try {
            final String sql = "SELECT * FROM User WHERE UserID = ?";
            return jdbc.queryForObject(sql, new UserMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<User> getAllUsers() {
        final String sql = "SELECT * FROM User";

        return jdbc.query(sql, new UserMapper());
    }

    @Override
    public User addUser(User user) {
        final String sql = "INSERT INTO User(Username, Name, Photo) VALUES (?, ?, ?)";
        jdbc.update(sql,
                user.getUsername(),
                user.getName(),
                user.getPhoto());

        int id = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        user.setId(id);
        return user;
    }

    @Override
    public boolean updateUser(User user) {
        final String sql = "UPDATE User SET "
                +"Username = ?, "
                +"Name = ?, "
                +"Photo = ? "
                +"WHERE UserID = ?";
        return jdbc.update(sql,
                user.getUsername(),
                user.getName(),
                user.getPhoto(),
                user.getId()) == 1;
    }

    @Override
    public boolean deleteUserByID(int id) {
        final String sql = "DELETE FROM User WHERE UserID = ?";
        return jdbc.update(sql, id) == 1;
    }
}
