package com.sz.cardly.dao;

import com.sz.cardly.entities.Card;

import java.util.List;

public interface CardDao {
    Card getCardById(int id);
    List<Card> getAllCards();
    Card addCard(Card card);
    boolean updateCard(Card card);
    boolean deleteCardById(int id);
}
