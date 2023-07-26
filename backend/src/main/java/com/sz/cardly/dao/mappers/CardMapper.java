package com.sz.cardly.dao.mappers;

import com.sz.cardly.entities.Card;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class CardMapper implements RowMapper<Card> {
    @Override
    public Card mapRow(ResultSet rs, int rowNum) throws SQLException {
        Card card = new Card();
        card.setId(rs.getInt("CardID"));
        card.setDeckId(rs.getInt("DeckID"));
        card.setFront(rs.getString("FrontCard"));
        card.setBack(rs.getString("BackCard"));
        card.setCreationDate(rs.getObject("CreationDate", LocalDateTime.class));
        card.setFavorited(rs.getBoolean("isFavorited"));

        return card;
    }
}
