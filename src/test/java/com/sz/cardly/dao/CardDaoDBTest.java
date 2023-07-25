package com.sz.cardly.dao;

import com.sz.cardly.entities.Card;
import com.sz.cardly.entities.Deck;
import com.sz.cardly.entities.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CardDaoDBTest {

    @Autowired
    CardDao cardDao;
    @Autowired
    DeckDao deckDao;
    @Autowired
    UserDao userDao;

    LocalDateTime date = LocalDateTime.of(2023, 7, 25, 11, 10, 45);

    User user;

    Deck deck;

    @BeforeEach
    void setUp() {
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
    }

    @Test
    public void testAddAndGetCardById(){
        Card card = new Card();
        card.setDeckId(deck.getId());
        card.setFront("What is a uses-a relationship?");
        card.setBack("A method of one class is using an object of another class.");
        card.setCreationDate(date);
        card = cardDao.addCard(card);

        Card added = cardDao.getCardById(card.getId());
        assertEquals(card, added);
    }

    @Test
    public void testGetAllCards(){
        Card card1 = new Card();
        card1.setDeckId(deck.getId());
        card1.setFront("What is a uses-a relationship?");
        card1.setBack("A method of one class is using an object of another class.");
        card1.setCreationDate(date);
        card1 = cardDao.addCard(card1);
        Card added1 = cardDao.getCardById(card1.getId());

        Card card2 = new Card();
        card2.setDeckId(deck.getId());
        card2.setFront("What is the default value assigned to an integer?");
        card2.setBack("0");
        card2.setCreationDate(date);
        card2 = cardDao.addCard(card2);
        Card added2 = cardDao.getCardById(card2.getId());

        List<Card> cards = cardDao.getAllCards();

        assertEquals(2, cards.size());
        assertTrue(cards.contains(card1));
        assertTrue(cards.contains(card2));
    }

    @Test
    public void testUpdateDeck(){
        Card card = new Card();
        card.setDeckId(deck.getId());
        card.setFront("What is a uses-a relationship?");
        card.setBack("Dunno");
        card.setCreationDate(date);
        card = cardDao.addCard(card);
        Card added = cardDao.getCardById(card.getId());

        Card updated = cardDao.getCardById(card.getId());
        assertEquals(card, updated);

        card.setBack("A method of one class is using an object of another class.");
        cardDao.updateCard(card);
        assertNotEquals(card, updated);

        updated = cardDao.getCardById(card.getId());
        assertEquals(card, updated);
    }

    @Test
    public void testDeleteDeckByID(){
        Card card = new Card();
        card.setDeckId(deck.getId());
        card.setFront("What is a uses-a relationship?");
        card.setBack("Dunno");
        card.setCreationDate(date);
        card = cardDao.addCard(card);
        Card added = cardDao.getCardById(card.getId());

        boolean isDeleted = cardDao.deleteCardById(card.getId());
        assertTrue(isDeleted);

        Card deleted = cardDao.getCardById(card.getId());
        assertNull(deleted);
    }
}