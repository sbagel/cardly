package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("UserID"));
        user.setUsername(rs.getString("Username"));
        user.setName(rs.getString("Name"));
        user.setPhoto(rs.getString("Photo"));
        return user;
    }
}
