package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.Session;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class SessionMapper implements RowMapper<Session> {
    @Override
    public Session mapRow(ResultSet rs, int rowNum) throws SQLException {
        Session session = new Session();
        session.setId(rs.getInt("SessionID"));
        session.setUserID(rs.getInt("UserID"));
        session.setDate(rs.getObject("Date", LocalDateTime.class));
        session.setDeckID(rs.getInt("DeckID"));
        return session;
    }
}
