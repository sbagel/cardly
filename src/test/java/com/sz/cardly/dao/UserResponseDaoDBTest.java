package com.sz.cardly.dao;

import com.sz.cardly.entities.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserResponseDaoDBTest {
    @Autowired
    UserResponseDao userResponseDao;
    @Autowired
    SessionDao sessionDao;
    @Autowired
    CardDao cardDao;
    @Autowired
    DeckDao deckDao;
    @Autowired
    UserDao userDao;
    LocalDateTime date = LocalDateTime.of(2023, 7, 25, 11, 10, 45);
    User user;
    Deck deck;
    Card card;
    Session session;
    @BeforeEach
    void setUp() {
        List<UserResponse> userResponses = userResponseDao.getAllUserResponses();
        userResponses.forEach(userResponse -> {
            userResponseDao.deleteUserResponseByID(userResponse.getId());
        });

        List<Session> sessions = sessionDao.getAllSessions();
        sessions.forEach(session -> {
            sessionDao.deleteSessionByID(session.getId());
        });

        List<Card> cards = cardDao.getAllCards();
        cards.forEach(card -> {
            cardDao.deleteCardById(card.getId());
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

        card = new Card();
        card.setDeckId(deck.getId());
        card.setFront("What is a uses-a relationship?");
        card.setBack("A method of one class is using an object of another class.");
        card.setCreationDate(date);
        card = cardDao.addCard(card);

        session = new Session();
        session.setUserID(user.getId());
        session.setDate(date);
        session.setDeckID(deck.getId());
        session = sessionDao.addSession(session);
    }
    @Test
    public void testAddAndGetUserResponseByID() {
        UserResponse userResponse = new UserResponse();
        userResponse.setSessionID(session.getId());
        userResponse.setCardID(card.getId());
        userResponse.setUserAnswerText("Some answer");
        userResponse.setScore(0.75f);
        userResponse = userResponseDao.addUserResponse(userResponse);

        UserResponse added = userResponseDao.getUserResponseByID(userResponse.getId());
        assertEquals(userResponse, added);
    }

    @Test
    public void testGetAllUserResponses() {
        UserResponse userResponse1 = new UserResponse();
        userResponse1.setSessionID(session.getId());
        userResponse1.setCardID(card.getId());
        userResponse1.setUserAnswerText("Answer 1");
        userResponse1.setScore(0.75f);
        userResponse1 = userResponseDao.addUserResponse(userResponse1);

        UserResponse userResponse2 = new UserResponse();
        userResponse2.setSessionID(session.getId());
        userResponse2.setCardID(card.getId());
        userResponse2.setUserAnswerText("Answer 2");
        userResponse2.setScore(0.75f);
        userResponse2 = userResponseDao.addUserResponse(userResponse2);

        List<UserResponse> userResponses = userResponseDao.getAllUserResponses();

        assertEquals(2, userResponses.size());
        assertTrue(userResponses.contains(userResponse1));
        assertTrue(userResponses.contains(userResponse2));
    }

    @Test
    public void testUpdateUserResponse() {
        UserResponse userResponse = new UserResponse();
        userResponse.setSessionID(session.getId());
        userResponse.setCardID(card.getId());
        userResponse.setUserAnswerText("Some answer");
        userResponse.setScore(0.75f);
        userResponse = userResponseDao.addUserResponse(userResponse);

        UserResponse updated = userResponseDao.getUserResponseByID(userResponse.getId());
        assertEquals(userResponse, updated);

        userResponse.setUserAnswerText("Updated answer");
        userResponse.setScore(0.85f);
        userResponseDao.updateUserResponse(userResponse);
        assertNotEquals(userResponse, updated);

        updated = userResponseDao.getUserResponseByID(userResponse.getId());
        assertEquals(userResponse, updated);
    }

    @Test
    public void testDeleteUserResponseByID() {
        UserResponse userResponse = new UserResponse();
        userResponse.setSessionID(session.getId());
        userResponse.setCardID(card.getId());
        userResponse.setUserAnswerText("Some answer");
        userResponse.setScore(0.75f);
        userResponse = userResponseDao.addUserResponse(userResponse);

        boolean isDeleted = userResponseDao.deleteUserResponseByID(userResponse.getId());
        assertTrue(isDeleted);

        UserResponse deleted = userResponseDao.getUserResponseByID(userResponse.getId());
        assertNull(deleted);
    }
}