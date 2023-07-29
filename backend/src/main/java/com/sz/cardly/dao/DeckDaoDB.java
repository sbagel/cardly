package com.sz.cardly.dao;

import com.sz.cardly.dao.mappers.DeckMapper;
import com.sz.cardly.entities.Deck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DeckDaoDB implements DeckDao{
    @Autowired
    JdbcTemplate jdbc;
    @Override
    public Deck getDeckByID(int id) {
        try {
            final String sql = "SELECT * FROM Deck WHERE DeckID = ?";
            return jdbc.queryForObject(sql, new DeckMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Deck> getAllDecksByUserId(int userId) {
        final String sql = "SELECT * FROM Deck WHERE UserID = ? ORDER BY lastViewDate DESC";
        return jdbc.query(sql, new DeckMapper(), userId);
    }

    @Override
    public List<Deck> getAllDecks() {
        final String sql = "SELECT * FROM Deck";
        return jdbc.query(sql, new DeckMapper());
    }

    @Override
    public Deck addDeck(Deck deck) {
        final String sql = "INSERT INTO Deck(UserID, Title, Description, CreationDate, LastViewDate, isVisible) " +
                "VALUES (?, ?, ?, ?, ?, ?)";
        jdbc.update(sql,
                deck.getUserID(),
                deck.getTitle(),
                deck.getDescription(),
                deck.getCreationDate(),
                deck.getLastViewDate(),
                deck.isVisible());

        int id = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        deck.setId(id);
        return deck;
    }

    @Override
    public boolean updateDeck(Deck deck) {
        final String sql = "UPDATE Deck SET " +
                "UserID = ?, " +
                "Title = ?, " +
                "Description = ?, " +
                "CreationDate = ?, " +
                "LastViewDate = ?, " +
                "isVisible = ? "
                +"WHERE DeckID = ?";
        return jdbc.update(sql,
                deck.getUserID(),
                deck.getTitle(),
                deck.getDescription(),
                deck.getCreationDate(),
                deck.getLastViewDate(),
                deck.isVisible(),
                deck.getId()) == 1;
    }

    @Override
    public boolean deleteDeckByID(int id) {
        final String sql = "DELETE FROM Deck WHERE DeckID = ?";
        return jdbc.update(sql, id) == 1;
    }
}
