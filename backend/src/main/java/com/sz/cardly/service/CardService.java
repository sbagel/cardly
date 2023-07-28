package com.sz.cardly.service;

import com.sz.cardly.entities.Card;

import java.util.List;

public interface CardService {
    Card getCardById(int id);
    List<Card> getAllCardsByDeckId(int deckId);
    Card addCard(Card card);
    boolean updateCard(Card card);
    boolean deleteCardById(int id);
}
