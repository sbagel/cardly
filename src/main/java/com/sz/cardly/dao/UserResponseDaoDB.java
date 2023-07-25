package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.UserResponseMapper;
import com.sz.cardly.entities.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserResponseDaoDB implements UserResponseDao {
    @Autowired
    JdbcTemplate jdbc;


    @Override
    public UserResponse getUserResponseByID(int responseID) {
        try {
            final String sql = "SELECT * FROM UserResponse WHERE ResponseID = ?";
            return jdbc.queryForObject(sql, new UserResponseMapper(), responseID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<UserResponse> getAllUserResponses() {
        final String sql = "SELECT * FROM UserResponse";
        return jdbc.query(sql, new UserResponseMapper());
    }

    @Override
    public UserResponse addUserResponse(UserResponse userResponse) {
        final String sql = "INSERT INTO UserResponse(SessionID, CardID, UserAnswerText, Score) " +
                "VALUES (?, ?, ?, ?)";
        jdbc.update(sql,
                userResponse.getSessionID(),
                userResponse.getCardID(),
                userResponse.getUserAnswerText(),
                userResponse.getScore());

        int id = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        userResponse.setId(id);
        return userResponse;
    }

    @Override
    public boolean updateUserResponse(UserResponse userResponse) {
        final String sql = "UPDATE UserResponse SET " +
                "SessionID = ?, " +
                "CardID = ?, " +
                "UserAnswerText = ?, " +
                "Score = ?";
        return jdbc.update(sql,
                userResponse.getSessionID(),
                userResponse.getCardID(),
                userResponse.getUserAnswerText(),
                userResponse.getScore()) == 1;
    }

    @Override
    public boolean deleteUserResponseByID(int responseID) {
        final String sql = "DELETE FROM UserResponse WHERE ResponseID = ?";
        return jdbc.update(sql, responseID) == 1;
    }
}
