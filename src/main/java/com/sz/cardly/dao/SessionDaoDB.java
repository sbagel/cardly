package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.SessionMapper;
import com.sz.cardly.entities.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SessionDaoDB implements SessionDao{
    @Autowired
    JdbcTemplate jdbc;

    @Override
    public Session getSessionByID(int sessionID) {
        try {
            final String sql = "SELECT * FROM Session WHERE SessionID = ?";
            return jdbc.queryForObject(sql, new SessionMapper(), sessionID);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Session> getAllSessions() {
        final String sql = "SELECT * FROM Session";
        return jdbc.query(sql, new SessionMapper());
    }

    @Override
    public Session addSession(Session session) {
        final String sql = "INSERT INTO Session(UserID, Date, DeckID) VALUES (?, ?, ?)";
        jdbc.update(sql,
                session.getUserID(),
                session.getDate(),
                session.getDeckID());

        int id = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        session.setId(id);
        return session;
    }

    @Override
    public boolean updateSession(Session session) {
        final String sql = "UPDATE Session SET " +
                "UserID = ?, " +
                "Date = ?, " +
                "DeckID = ?";
        return jdbc.update(sql,
                session.getUserID(),
                session.getDate(),
                session.getDeckID()) == 1;
    }

    @Override
    public boolean deleteSessionByID(int sessionID) {
        final String sql = "DELETE FROM Session WHERE SessionID = ?";
        return jdbc.update(sql, sessionID) == 1;
    }
}
