package com.sz.cardly.dao;

import com.sz.cardly.entities.Session;

import java.util.List;

public interface SessionDao {
    Session getSessionByID(int sessionID);
    List<Session> getAllSessions();
    Session addSession(Session session);
    boolean updateSession(Session session);
    boolean deleteSessionByID(int sessionID);
}