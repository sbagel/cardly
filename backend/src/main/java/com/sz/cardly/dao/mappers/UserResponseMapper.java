package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.UserResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserResponseMapper implements RowMapper<UserResponse> {
    @Override
    public UserResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(rs.getInt("ResponseID"));
        userResponse.setSessionID(rs.getInt("SessionID"));
        userResponse.setCardID(rs.getInt("CardID"));
        userResponse.setUserAnswerText(rs.getString("UserAnswerText"));
        userResponse.setScore(rs.getFloat("Score"));
        return userResponse;
    }
}
