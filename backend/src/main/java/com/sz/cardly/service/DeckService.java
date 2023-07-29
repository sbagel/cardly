package com.sz.cardly.service;

import com.sz.cardly.entities.Deck;

import java.util.List;

public interface DeckService {
    Deck getDeckByID(int id);
    List<Deck> getAllDecksByUserId(int userId);
    List<Deck> getAllDecks();
    Deck addDeck(Deck deck);
    boolean updateDeck(Deck deck);
    boolean deleteDeckByID(int id);
}
