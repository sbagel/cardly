package com.sz.cardly.dao;

import com.sz.cardly.entities.Deck;

import java.util.List;

public interface DeckDao {
    Deck getDeckByID(int id);
    List<Deck> getAllDecks();
    Deck addDeck(Deck deck);
    boolean updateDeck(Deck deck);
    boolean deleteDeckByID(int id);
}
