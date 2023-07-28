package com.sz.cardly.service;

import com.sz.cardly.dao.CardDao;
import com.sz.cardly.entities.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService {
    @Autowired
    CardDao cardDao;

    @Override
    public Card getCardById(int id) {
        return cardDao.getCardById(id);
    }

    @Override
    public List<Card> getAllCardsByDeckId(int deckId) {
        return cardDao.getAllCardsByDeckId(deckId);
    }

    @Override
    public Card addCard(Card card) {
        return cardDao.addCard(card);
    }

    @Override
    public boolean updateCard(Card card) {
        return cardDao.updateCard(card);
    }

    @Override
    public boolean deleteCardById(int id) {
        return cardDao.deleteCardById(id);
    }
}
