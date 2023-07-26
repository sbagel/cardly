package com.sz.cardly.dao;

import com.sz.cardly.entities.Deck;
import com.sz.cardly.entities.Session;
import com.sz.cardly.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SessionDaoDBTest {
    @Autowired
    SessionDao sessionDao;
    @Autowired
    DeckDao deckDao;
    @Autowired
    UserDao userDao;

    LocalDateTime date = LocalDateTime.of(2023, 7, 25, 11, 10, 45);

    User user;

    Deck deck;

    @BeforeEach
    void setUp() {
        List<Session> sessions = sessionDao.getAllSessions();
        sessions.forEach(session -> {
            sessionDao.deleteSessionByID(session.getId());
        });

        List<Deck> decks = deckDao.getAllDecks();
        decks.forEach(deck -> {
            deckDao.deleteDeckByID(deck.getId());
        });

        List<User> users = userDao.getAllUsers();
        users.forEach(user -> {
            userDao.deleteUserByID(user.getId());
        });

        user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        deck = new Deck();
        deck.setUserID(user.getId());
        deck.setTitle("Deck1");
        deck.setDescription("Description for Deck1");
        deck.setCreationDate(date);
        deck.setLastViewDate(date);
        deck.setVisible(true);
        deck = deckDao.addDeck(deck);
    }

    @Test
    public void testAddAndGetSessionByID() {
        Session session = new Session();
        session.setUserID(user.getId());
        session.setDate(date);
        session.setDeckID(deck.getId());
        session = sessionDao.addSession(session);

        Session added = sessionDao.getSessionByID(session.getId());
        assertEquals(session, added);
    }

    @Test
    public void testGetAllSessions() {
        Session session1 = new Session();
        session1.setUserID(user.getId());
        session1.setDate(date);
        session1.setDeckID(deck.getId());
        session1 = sessionDao.addSession(session1);

        Session session2 = new Session();
        session2.setUserID(user.getId());
        session2.setDate(date);
        session2.setDeckID(deck.getId());
        session2 = sessionDao.addSession(session2);

        List<Session> sessions = sessionDao.getAllSessions();

        assertEquals(2, sessions.size());
        assertTrue(sessions.contains(session1));
        assertTrue(sessions.contains(session2));
    }

    @Test
    public void testUpdateSession() {
        Session session = new Session();
        session.setUserID(user.getId());
        session.setDate(date);
        session.setDeckID(deck.getId());
        session = sessionDao.addSession(session);

        Session updated = sessionDao.getSessionByID(session.getId());
        assertEquals(session, updated);

        session.setDate(LocalDateTime.of(2023, 7, 25, 12, 10, 45));
        sessionDao.updateSession(session);
        assertNotEquals(session, updated);

        updated = sessionDao.getSessionByID(session.getId());
        assertEquals(session, updated);
    }

    @Test
    public void testDeleteSessionByID() {
        Session session = new Session();
        session.setUserID(user.getId());
        session.setDate(date);
        session.setDeckID(deck.getId());
        session = sessionDao.addSession(session);

        boolean isDeleted = sessionDao.deleteSessionByID(session.getId());
        assertTrue(isDeleted);

        Session deleted = sessionDao.getSessionByID(session.getId());
        assertNull(deleted);
    }
}