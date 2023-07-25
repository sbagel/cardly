package com.sz.cardly.dao;

import com.sz.cardly.entities.Card;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CardDaoDBTest {

    @Autowired
    CardDao cardDao;

    LocalDateTime date = LocalDateTime.now();

    @BeforeEach
    void setUp() {
        List<Card> cards = cardDao.getAllCards();
        cards.forEach(card -> {
            cardDao.deleteCardById(card.getId());
        });
    }

    @Test
    public void testAddAndGetCardById(){
        Card card = new Card();
        card.setDeckId(1);
        card.setFront("What is a uses-a relationship?");
        card.setBack("A method of oen class is using an object of another class.");
        card.setCreationDate(date);
        card = cardDao.addCard(card);

        Card added = cardDao.getCardById(card.getId());
        assertEquals(card, added);
    }

}