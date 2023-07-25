package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.CardMapper;
import com.sz.cardly.entities.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CardDaoDB implements CardDao{
    @Autowired
    JdbcTemplate jdbc;

    @Override
    public Card getCardById(int id) {
        try {
            final String sql = "SELECT * FROM card WHERE cardID = ?";
            return jdbc.queryForObject(sql, new CardMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Card> getAllCards() {
        final String sql = "SELECT * FROM card";

        return jdbc.query(sql, new CardMapper());
    }

    @Override
    public Card addCard(Card card) {
        final String sql = "INSERT INTO card(DeckID, FrontCard, BackCard, CreationDate, isFavorited) "
                +"VALUES(?,?,?,?,?)";
        jdbc.update(sql,
                card.getDeckId(),
                card.getFront(),
                card.getBack(),
                card.getCreationDate(),
                card.isFavorited());

        int id = jdbc.queryForObject("SELECT LAST INSERT_ID()", Integer.class);
        card.setId(id);
        return card;
    }

    @Override
    public boolean updateCard(Card card) {
        final String sql = "UPDATE card SET "
                +"DeckID = ?, "
                +"FrontCard = ?, "
                +"BackCard = ?, "
                +"CreationDate = ?,"
                +"isFavorited = ?";
        return jdbc.update(sql,
                card.getDeckId(),
                card.getFront(),
                card.getBack(),
                card.getCreationDate(),
                card.isFavorited()) == 1;
    }

    @Override
    public boolean deleteCardById(int id) {
        final String sql = "DELETE FROM card WHERE cardID = ?";
        return jdbc.update(sql, id) == 1;
    }
}
