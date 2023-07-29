package com.sz.cardly.service;

import com.sz.cardly.dao.DeckDao;
import com.sz.cardly.entities.Deck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeckServiceImpl implements DeckService {

    @Autowired
    DeckDao deckDao;

    @Override
    public Deck getDeckByID(int id) {
        return deckDao.getDeckByID(id);
    }

    @Override
    public List<Deck> getAllDecksByUserId(int userId) {
        return deckDao.getAllDecksByUserId(userId);
    }

    @Override
    public List<Deck> getAllDecks() {
        return deckDao.getAllDecks();
    }

    @Override
    public Deck addDeck(Deck deck) {
        return deckDao.addDeck(deck);
    }

    @Override
    public boolean updateDeck(Deck deck) {
        return deckDao.updateDeck(deck);
    }

    @Override
    public boolean deleteDeckByID(int id) {
        return deckDao.deleteDeckByID(id);
    }
}
