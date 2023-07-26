package com.sz.cardly.entities;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Session {
    private int id;
    private int userID;
    private LocalDateTime date;
    private int deckID;
}
