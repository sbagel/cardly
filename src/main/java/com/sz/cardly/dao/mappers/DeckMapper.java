package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.Deck;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class DeckMapper implements RowMapper<Deck> {
    @Override
    public Deck mapRow(ResultSet rs, int rowNum) throws SQLException {
        Deck deck = new Deck();
        deck.setId(rs.getInt("DeckID"));
        deck.setUserID(rs.getInt("UserID"));
        deck.setTitle(rs.getString("Title"));
        deck.setDescription(rs.getString("Description"));
        deck.setCreationDate(rs.getObject("CreationDate", LocalDateTime.class));
        deck.setLastViewDate(rs.getObject("LastViewDate", LocalDateTime.class));
        deck.setVisible(rs.getBoolean("isVisible"));
        return deck;
    }
}
