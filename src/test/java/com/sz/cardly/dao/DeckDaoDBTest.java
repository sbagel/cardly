package com.sz.cardly.dao;

import com.sz.cardly.entities.Deck;
import com.sz.cardly.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DeckDaoDBTest {
    @Autowired
    DeckDao deckDao;
    @Autowired
    UserDao userDao;
    LocalDateTime date = LocalDateTime.of(2023, 7, 25, 11, 10, 45);
    @BeforeEach
    void setUp() {
        List<Deck> decks = deckDao.getAllDecks();
        decks.forEach(deck -> {
            deckDao.deleteDeckByID(deck.getId());
        });

        List<User> users = userDao.getAllUsers();
        users.forEach(user -> {
            userDao.deleteUserByID(user.getId());
        });
    }

    @Test
    public void testAddAndGetDeckByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        Deck deck = new Deck();
        deck.setUserID(user.getId());
        deck.setTitle("Deck1");
        deck.setDescription("Description for Deck1");
        deck.setCreationDate(date);
        deck.setLastViewDate(date);
        deck.setVisible(true);
        deck = deckDao.addDeck(deck);

        Deck added = deckDao.getDeckByID(deck.getId());
        assertEquals(deck, added);
    }

    @Test
    public void testGetAllDecks(){
        User user1 = new User();
        user1.setUsername("sbagel");
        user1.setName("Sophia Bagel");
        user1.setPhoto("url");
        user1 = userDao.addUser(user1);

        Deck deck1 = new Deck();
        deck1.setUserID(user1.getId());
        deck1.setTitle("Deck1");
        deck1.setDescription("Description for Deck1");
        deck1.setCreationDate(date);
        deck1.setLastViewDate(date);
        deck1.setVisible(true);
        deck1 = deckDao.addDeck(deck1);

        User user2 = new User();
        user2.setUsername("bagels");
        user2.setName("Bagel Sophia");
        user2.setPhoto("url");
        user2 = userDao.addUser(user2);

        Deck deck2 = new Deck();
        deck2.setUserID(user2.getId());
        deck2.setTitle("Deck2");
        deck2.setDescription("Description for Deck2");
        deck2.setCreationDate(date);
        deck2.setLastViewDate(date);
        deck2.setVisible(false);
        deck2 = deckDao.addDeck(deck2);

        List<Deck> decks = deckDao.getAllDecks();

        assertEquals(2, decks.size());
        assertTrue(decks.contains(deck1));
        assertTrue(decks.contains(deck2));
    }

    @Test
    public void testUpdateDeck(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        Deck deck = new Deck();
        deck.setUserID(user.getId());
        deck.setTitle("Deck1");
        deck.setDescription("Description for Deck1");
        deck.setCreationDate(date);
        deck.setLastViewDate(date);
        deck.setVisible(true);
        deck = deckDao.addDeck(deck);

        Deck updated = deckDao.getDeckByID(deck.getId());
        assertEquals(deck, updated);

        deck.setTitle("Updated Deck");
        deckDao.updateDeck(deck);
        assertNotEquals(deck, updated);

        updated = deckDao.getDeckByID(deck.getId());
        assertEquals(deck, updated);
    }

    @Test
    public void testDeleteDeckByID(){
        User user = new User();
        user.setUsername("sbagel");
        user.setName("Sophia Bagel");
        user.setPhoto("url");
        user = userDao.addUser(user);

        Deck deck = new Deck();
        deck.setUserID(user.getId());
        deck.setTitle("Deck1");
        deck.setDescription("Description for Deck1");
        deck.setCreationDate(date);
        deck.setLastViewDate(date);
        deck.setVisible(true);
        deck = deckDao.addDeck(deck);

        boolean isDeleted = deckDao.deleteDeckByID(deck.getId());
        assertTrue(isDeleted);

        Deck deleted = deckDao.getDeckByID(deck.getId());
        assertNull(deleted);
    }
}